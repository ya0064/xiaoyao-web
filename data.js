const navData = [
    {
        category: "不求人导航",
        sites: [
            { name: "百度", url: "https://www.baidu.com", description: "中国最大的搜索引擎" },
            { name: "谷歌", url: "https://www.google.com", description: "全球最大的搜索引擎" },
            { name: "必应", url: "https://www.bing.com", description: "微软旗下搜索引擎" },
            { name: "知乎", url: "https://www.zhihu.com", description: "高质量问答社区" },
            { name: "豆瓣", url: "https://www.douban.com", description: "文艺青年聚集地" },
            { name: "微博", url: "https://weibo.com", description: "中文社交媒体平台" }
        ]
    },
    {
        category: "AI工具集",
        sites: [
            { name: "ChatGPT", url: "https://chat.openai.com", description: "OpenAI智能助手" },
            { name: "豆包", url: "https://www.doubao.com", description: "字节跳动AI助手" },
            { name: "文心一言", url: "https://yiyan.baidu.com", description: "百度AI对话助手" },
            { name: "MidJourney", url: "https://www.midjourney.com", description: "AI图像生成工具" },
            { name: "DALL·E", url: "https://openai.com/product/dall-e", description: "OpenAI图像生成" },
            { name: "Claude", url: "https://claude.ai", description: "Anthropic AI助手" }
        ]
    },
    {
        category: "在线工具",
        sites: [
            { name: "在线转换", url: "https://www.alltoall.net", description: "格式转换工具" },
            { name: "草料二维码", url: "https://cli.im", description: "二维码生成工具" },
            { name: "小图标", url: "https://www.iconfont.cn", description: "阿里巴巴矢量图标库" },
            { name: "ProcessOn", url: "https://www.processon.com", description: "在线思维导图" },
            { name: "石墨文档", url: "https://shimo.im", description: "在线协作文档" },
            { name: "腾讯文档", url: "https://docs.qq.com", description: "腾讯在线文档" }
        ]
    },
    {
        category: "编程开发",
        sites: [
            { name: "GitHub", url: "https://github.com", description: "全球最大代码托管平台" },
            { name: "Stack Overflow", url: "https://stackoverflow.com", description: "程序员问答社区" },
            { name: "MDN", url: "https://developer.mozilla.org", description: "Web开发文档" },
            { name: "LeetCode", url: "https://leetcode.com", description: "算法刷题平台" },
            { name: "掘金", url: "https://juejin.cn", description: "开发者社区" },
            { name: "CSDN", url: "https://www.csdn.net", description: "中国开发者社区" }
        ]
    },
    {
        category: "影音娱乐",
        sites: [
            { name: "B站", url: "https://www.bilibili.com", description: "年轻人的视频社区" },
            { name: "爱奇艺", url: "https://www.iqiyi.com", description: "综合视频平台" },
            { name: "腾讯视频", url: "https://v.qq.com", description: "腾讯旗下视频平台" },
            { name: "网易云音乐", url: "https://music.163.com", description: "音乐流媒体平台" },
            { name: "QQ音乐", url: "https://y.qq.com", description: "腾讯音乐平台" },
            { name: "AcFun", url: "https://www.acfun.cn", description: "弹幕视频网站" }
        ]
    },
    {
        category: "生活服务",
        sites: [
            { name: "美团", url: "https://www.meituan.com", description: "本地生活服务平台" },
            { name: "饿了么", url: "https://www.ele.me", description: "外卖订餐平台" },
            { name: "携程", url: "https://www.ctrip.com", description: "在线旅游平台" },
            { name: "大众点评", url: "https://www.dianping.com", description: "本地生活点评" },
            { name: "滴滴出行", url: "https://www.didiglobal.com", description: "网约车平台" },
            { name: "顺丰速运", url: "https://www.sf-express.com", description: "快递物流服务" }
        ]
    }
];

const icons = ['🌐', '🔍', '💡', '🎯', '🚀', '⭐', '🔥', '💎', '🎨', '🎵', '📚', '💻', '☁️', '🔧', '🎁', '🌟', '⚡', '🌈', '🎭', '🏆'];