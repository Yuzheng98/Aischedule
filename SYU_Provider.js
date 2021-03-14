function scheduleHtmlProvider(iframeContent = "", frameContent = "", dom = document) {
	try{

	//快速配置
		//一周的起始日
			let weekStart='一'
			//let weekStart='日'
		//课表请求url
			let url='/jsxsd/xskb/xskb_list.do'
			//let url='/jlxy_jsxsd/xskb/xskb_list.do'
			
			
    alert('课表即将导入......\n' +
        '请确保当前网页处于教务管理位置\n' +
		'导入成功后请在app中调整好上午/下午/晚上的节数\n'+
		'设置周的起始日为周'+weekStart+'（参考自己学校的教务课表）！\n'+
        'bug加群628325112')
		
    let presentURl=location.href;
    if (!presentURl.match(/jsxsd/))throw new Error('当前网页位置不正确，请重试')


    //获取当前学期的字符串
    let getQueryStrArr=()=>{
		let d=new Date()
		let year=d.getFullYear()
		let month=d.getMonth()+1
		let date=d.getDate()
		let year_str="",term_str=""
		if (8 <= month && month <= 12) {
			year_str = String(year) + "-" + String(year + 1)
			term_str = '1'
		} else if (month == 1&&date<20) {
			year_str=String(year-1) + "-" + String(year)
			term_str = '1'
		}else if (month<=5||(month==6&&date<20)){
			year_str=String(year-1) + "-" + String(year)
			term_str = '2'
		}else{
			year_str=String(year-1) + "-" + String(year)
			term_str = '2'
		}
		if(year_str&&term_str)
			return [year_str,term_str]
		else throw new Error('获取学期字符串失败')
    }
    
    let semester=getQueryStrArr()[0]+'-'+getQueryStrArr()[1]
    let xhr=new XMLHttpRequest()
    xhr.open('GET',url+'?xnxq01id='+semester,false)
    xhr.send()
    if (xhr.readyState==4&&xhr.status==200)return xhr.responseText.replace(/[\r\n]/g,' ')
	//捕获异常

	}catch(err){
		alert(err.stack)
		console.error(err.stack)
		return '<html>什么都没获取到</html>'
	}
}