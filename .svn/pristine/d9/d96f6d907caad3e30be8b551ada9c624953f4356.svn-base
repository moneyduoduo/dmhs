
const PROXY_SYSTEM = '/';//接口地址配置
//const PROXY_SYSTEM = 'http://192.168.50.71:8080';
const API_PRE=''
const configApixs = ({ PROXY_SYSTEM, API_PRE })=>{
  const CMS_SERVICE = `${API_PRE}/api`;
  return {
	    getPartyFileClassNames:{ url: `${PROXY_SYSTEM}${CMS_SERVICE}/mainResource/getPartyFileClassNames`, method: 'GET' }, // 获取文件分类名称接口
		getAllFiles:{ url: `${PROXY_SYSTEM}${CMS_SERVICE}/mainResource/getAllFiles`, method: 'GET' }, // 资源中心查询文件接口
	}
};

export default configApixs({PROXY_SYSTEM,API_PRE})