# 小爱课程表导入-强智系统-沈阳大学

沈阳大学 shenyang university 
# 步骤概览
![image](https://user-images.githubusercontent.com/60589466/111071327-99214f00-8510-11eb-949c-283d77e427a7.png)


# 使用步骤
1. 下载AISchdule DevTools压缩包，解压到本地。
2. 下载Chrome，打开链接 chrome://extensions/ ，打开开发者模式，导入AISchedule DevTools文件夹。 ![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcn0cLvggaZBxBQqvrcxOn8Eh/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
3. 在Chrome打开一个新的Tab，打开、登陆自己的教务系统，进入课程页面（比如下图展示课程表）。  ![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcn8XBOmCkUtukm2qwSvaOaWd/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
4. 在网页内右键，选「检查」，打开Chrome开发者工具，会有新增的AISchedule标签，进入后请跟随新手引导，创建「适配项目」。 ![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcnmUOxY4t5fX14tQCVxzRKnc/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
！注意：学校url请填写官方url，不要填写ip或者代理！ 
![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcnKRrXYEmi0xAs7NwFtTvwkb/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
5. 当你点击provider/parser函数的代码区时，会跳转到sources中，在此你可以编辑scheduleHtmlProvider函数、scheduleHtmlParser函数，并打断点debug。  ![image](https://user-images.githubusercontent.com/60589466/111071354-b6561d80-8510-11eb-921a-1699b36d84ea.png)

6. 你可以参考注释与示例函数，编写两个适配函数。按ctrl+s/cmd+s保存，然后在网页中右键，选「AISchedule DevTools 运行」，Console中会打印出运行结果，两个函数的输出会分别在新窗口中显示，以便你边参考边修改函数。scheduleHtmlParser函数的输出须符合以下数据结构。  ![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcnznYv4ntI49qc01JniWw5Rf/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
（代码中无需引用任何模块，不要带有“require”这样的字符）
（scheduleHtmlParser函数的输出须符合以下数据结构）  ![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcnwONMBtZcpqrf3BUAWrPHSc/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
不支持在 Docs 外粘贴 block   
```JAVASCRIPT
{
    "courseInfos": [
      {
        "name": "数学",
        "position": "教学楼1",
        "teacher": "张三",
        "weeks": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ],
        "day": 3,
        "sections": [
          {
            "section": 2,
            "startTime": "08:00",//可不填
            "endTime": "08:50"//可不填
          }
        ],
      },
      {
        "name": "语文",
        "position": "基础楼",
        "teacher": "荆州",
        "weeks": [
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20
        ],
        "day": 2,
        "sections": [
          {
            "section": 2,
            "startTime": "08:00",//可不填
            "endTime": "08:50"//可不填
          },
          {
            "section": 3,
            "startTime": "09:00",//可不填
            "endTime": "09:50"//可不填
          }
        ],
      }
    ],
    "sectionTimes": [
      {
        "section": 1,
        "startTime": "07:00",
        "endTime": "07:50"
      },
      {
        "section": 2,
        "startTime": "08:00",
        "endTime": "08:50"
      },
      {
        "section": 3,
        "startTime": "09:00",
        "endTime": "09:50"
      },
      {
        "section": 4,
        "startTime": "10:10",
        "endTime": "11:00"
      },
      {
        "section": 5,
        "startTime": "11:10",
        "endTime": "12:00"
      },
      {
        "section": 6,
        "startTime": "13:00",
        "endTime": "13:50"
      },
      {
        "section": 7,
        "startTime": "14:00",
        "endTime": "14:50"
      },
      {
        "section": 8,
        "startTime": "15:10",
        "endTime": "16:00"
      },
      {
        "section": 9,
        "startTime": "16:10",
        "endTime": "17:00"
      },
      {
        "section": 10,
        "startTime": "17:10",
        "endTime": "18:00"
      },
      {
        "section": 11,
        "startTime": "18:40",
        "endTime": "19:30"
      },
      {
        "section": 12,
        "startTime": "19:40",
        "endTime": "20:30"
      },
      {
        "section": 13,
        "startTime": "20:40",
        "endTime": "21:30"
      }
    ]
  }
```
7. 经过调试，如果在console中看到「All run successfully」，然后你可以上传到手机端，进行E2E自测（端到端自测）。  ![image](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/all/boxcnSwSas8mp9Jb2HXs48Clqfd/?mount_node_token=doccnhZPl8KnswEthRXUz8ivnhb&mount_point=doc_image)
8. 在手机端打开课程表的教务导入功能，搜索学校，选择自己提交的适配，你可亲自体验，验证可用性。如果你觉得没问题，请点击反馈按钮「完美」，至此，你的适配已完成，状态为审核中。  ![image](blob:https://ldtu0m3md0.feishu.cn/3db21cb3-616d-4695-93d4-b4a67ba8af77)      ![image](blob:https://ldtu0m3md0.feishu.cn/be9b2a38-ef14-49a0-9612-93031e81f292)    ![image](blob:https://ldtu0m3md0.feishu.cn/44d921c2-aefc-4cfd-9176-5c4667f596aa)
如果未导入成功，请查看右下角vControl中的log->info,核对返回值：   ![image](blob:https://ldtu0m3md0.feishu.cn/c8a60cd5-44c0-44a5-9734-c7dbd4b9f0d5)
9. 工具中会保存你的历史适配记录和适配学校的状态，如果你的适配项目发布了，会为很多同学提供便利哦~
# 术语解释
- scheduleHtmlProvider函数：输入课程页面的 document 对象，从页面中提取课程信息的HTML片段,输出HTML字符串。
- scheduleHtmlParser函数：输入课程页面的HTML字符串，提取课程信息，按约定的格式输出JSON。因为这部分是在服务端解析的，用到了cheerio的环境，所以其中不包含document和window对象！



官方适配教程：https://ldtu0m3md0.feishu.cn/docs/doccnhZPl8KnswEthRXUz8ivnhb

特别鸣谢：东北大学 浮沉
