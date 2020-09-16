/**
 * 链接跳转
 * */
export const linkTo = (url) => {
	console.log(url, 'url')
	uni.navigateTo({
		url
	})
}
// 返回
export const backTo = (delta = 1) => {
	uni.navigateBack({
		delta: delta
	})
}
// 时间格式转换
export const formatTime = (time, format) => {
	format = format ? format : "yyyy-MM-dd hh:mm:ss";
	let date = new Date(time);
	const yyyy = date.getFullYear();
	const MM = addZero(date.getMonth() + 1);
	const dd = addZero(date.getDate());
	const hh = addZero(date.getHours());
	const mm = addZero(date.getMinutes());
	const ss = addZero(date.getSeconds());

	return format.replace("yyyy", yyyy)
		.replace("MM", MM)
		.replace("dd", dd)
		.replace("hh", hh)
		.replace("mm", mm)
		.replace("ss", ss)
}
const addZero = function(num) {
	num = num + '';
	if (num.length < 2) {
		return '0' + num;
	}
	return num;
}

//消息提示
export const showMsg = (title, icon = 'none') => {
	uni.showToast({
		title: title,
		icon: icon,
		duration: 1500,
		mask: true
	})
};

//设置缓存
export const setStorage = (key, data) => uni.setStorage({
	key: key,
	data: data
})

//读取缓存
export const getStorage = key => {
	try {
		var value = uni.getStorageSync(key)
		if (value) {
			return value
		}
	} catch (e) {
		console.log(e)
	}
}

//上传文件
export const upLoad = async url => {
	return await new Promise((resove, reject) => {
		uni.uploadFile({
			url: '',
			filePath: url,
			name: 'file',
			success: res => {
				if (res.statusCode === 200) {
					resove(JSON.parse(res.data))
				}
			},
			fail: res => {
				uni.showToast({
					title: res.msg,
					mask: true,
					duration: 1500,
				})
				reject(res)
			},
		})
	})

}
