function scheduleHtmlParser(html) {
    try{

        //快速配置
        //表格id
			let tableId='kbtable'
			//let tableId='timetable'
        //课程信息位置
            let courIdex=3
            //let courIdex=4

        result=[]
        // 正则定义
        let courPattern=/[^<>]+(<font.*?>.*?<\/font>){1,5}/g
        let namePattern=/[^<>]+/
        let nameClearPattern=/-{6,}|\(.{6,}\)/g
        let teacherClearPattern=/-+$/g
        let mresult=null

        $=cheerio.load(html,{decodeEntities:false})
        if($('#'+tableId).length)var table=$('#'+tableId)[0]
        else throw new Error('没有找到课程表')
        let trs=$(table).find('tr:not(:last-child):not(:first-child)')


        trs.each((trIndex,tr)=>{
            $(tr).find('td').each((tdIndex,td)=>{
                td=$(td)
                let courInfo=$(td.children()[courIdex])
                if(courInfo.html().match(/周次/g)){
                    let courNum=courInfo.html().match(/周次/g).length
                    if(courNum==1) getCourse(courInfo, tdIndex+1,trIndex+1);
                    else {
                        mresult=courInfo.html().replace(/<br>/g,'').match(courPattern)
                        if(mresult)
                            mresult.forEach((cour)=>{
                                getCourse($('<div>'+cour+'</div>'),tdIndex+1,trIndex+1)
                            })
                        else throw new Error('匹配单节课失败')
                    }
                }
            })

        })
        //解析单节课
        function getCourse(courInfo, dayOfWeek, secNum) {
            let cour = {
                "name": '',
                "position": '',
                "teacher": '',
                "day": '',
                "sections": [],
                "weeks": []
            }
            //课程名
            mresult= courInfo.html().match(namePattern)
            if(mresult)cour.name=mresult[0].replace(nameClearPattern,'')
            else throw new Error('名称匹配失败')
            //老师
            cour.teacher = courInfo.children('font[title="老师"]').text() || ''
            cour.teacher=cour.teacher.replace(teacherClearPattern,'')
            //教室
            cour.position = courInfo.children('font[title="教室"]').text() || ''
            //星期数
            cour.day = dayOfWeek

            let weekAndSec = courInfo.children('font[title="周次(节次)"]').text()
            if (!weekAndSec)throw new Error("周数和学期未找到");

            //匹配周数
            let weekStr = weekAndSec.split('(周)')[0]
            let secStr = weekAndSec.split('(周)')[1]
            weekStr.split(',').forEach((weekNum, i) => {
                if (weekNum.match(/-/)) {
                    let start = +weekNum.split('-')[0]
                    let end = +weekNum.split('-')[1]
                    while (start <= end) {
                        cour.weeks.push(start)
                        start++
                    }
                } else cour.weeks.push(+weekNum)

            })
            // 匹配节数
            let secRange = secStr.match(/(\d{1,2})-(\d{1,2})/)
            if(secRange){
                let secStart = +secRange[1]
                let secEnd = +secRange[2]
                while (secStart <= secEnd) {
                    cour.sections.push({section: secStart})
                    secStart++
                }
            }else {
                cour.sections.push({section: secNum*2-1})
                cour.sections.push({section: secNum*2})
            }
            result.push(cour)
        }
        result=testResult(result)
        console.log(result)

        let secTimes=getSecTimes({mNum:4,aNum:4,eNum:4,
        mStartTime:[8,0],aStartTime:[13,30],eStartTime:[17,50],
        courSpan:45,interval:10,bigInterval:20,bigInterPos:[2],
        bigInterval2:30,bigInterPos2:[6]})

        return { courseInfos: result,sectionTimes:secTimes }
        //捕获异常
    }catch(err){
        errorInfo=err.stack
        console.error(errorInfo)

        let lineNumArray=errorInfo.split('\n')[1].split(':').reverse()
        let lineNum=+lineNumArray[1]-9+'：'+lineNumArray[0].slice(0,-1)
        let error =errorInfo.split('\n')[0]+'：'+lineNum
        let result=[{
            name: "Parser出现错误",
            position: error,
            teacher: "加群628325112找浮沉反馈bug",
            day: "1",
            sections: [
                {section: 1},
                {section: 2},
                {section: 3},
                {section: 4}],
            weeks: [1, 2, 3]
        }]
        console.info(result)
        
        return {
        	courseInfos:result
        	}
    }
}


function testResult(result){
            //检查是否匹配到课程
            if(!result.length)throw new Error('parser匹配的结果为空')

            //限制字段长度
            let limitLen=cours=>{
                return cours.map(cour=>{
                    if(cour.name.length>50){
                        cour.name=cour.name.slice(0,47)+'...'
                        console.info(cour.name+'过长，已截短')
                    }
                    if(cour.position.length>50){
                        cour.position=cour.position.slice(0,47)+'...'
                        console.info(cour.position+'过长，已截短')
                    }
                    if(cour.teacher.length>50){
                        cour.teacher=cour.teacher.slice(0,47)+'...'
                        console.info(cour.teacher+'过长，已截短')
                    }
                    return cour
                })
            }
            //获取一天中最大的节数
            let getMaxSec=cours=>{
                let maxSec=0
                cours.forEach(cour=>{
                    cour.sections.forEach(sec=>{
                        if (+sec.section>maxSec)
                            maxSec=+sec.section
                    })
                })
                return maxSec
            }
            //测试时间是否冲突
            let testTime=cours=>{
                let maxSec=getMaxSec(cours)
                let secTimeStamps=[]
                cours.forEach(cour=>{
                    let dayOfWeek=+cour.day
                    cour.sections.forEach(sec=>{
                        cour.weeks.forEach(week=>{
                            +sec.section+(dayOfWeek-1)*maxSec+(+week-1)*7*maxSec
                        })
                    })
                })
                for(let i=0;i<secTimeStamps.length-1;i++)
                    if(secTimeStamps[i]>=secTimeStamps[i+1])return false
                return true
            }

            result=limitLen(result)
            if(!testTime(result))throw new Error('课程时间冲突无法导入')
            return result
        }

function getSecTimes(secInfo) {
  
    let secTimes=[]
    let creatSec=(index,start,end)=>{
        return {"section": index,"startTime":start, "endTime":end}
    }
    let i=1
    let time=new Date()
    function checkTime(t){
        if (t<10){
            t="0" + t;
        }
        return t;
    }
    let addSecTimes=(timeStr)=>{
        time.setHours(+secInfo[timeStr+'StartTime'][0])
        time.setMinutes(+secInfo[timeStr+'StartTime'][1])
        let startSec=i
        for(;i<=startSec+secInfo[timeStr+'Num']-1;i++){
            let startTime=new Date(time.getTime())
            time.setMinutes(time.getMinutes()+secInfo.courSpan)

            let startStr=checkTime(startTime.getHours())+":"+checkTime(startTime.getMinutes())
            let endStr=checkTime(time.getHours())+":"+checkTime(time.getMinutes())
            secTimes.push(creatSec(i,startStr,endStr))

            if(secInfo.bigInterPos.includes(i))
                time.setMinutes(time.getMinutes()+secInfo.bigInterval2)
            else if(secInfo.bigInterPos2.includes(i))
                time.setMinutes(time.getMinutes()+secInfo.bigInterval2)
            else time.setMinutes(time.getMinutes()+secInfo.interval)
        }
    }
    addSecTimes('m')
    addSecTimes('a')
    addSecTimes('e')
    return secTimes
}
// @yuzheng98
//鸣谢 东北大学-浮沉