function extend(...objs) {
	let map = Object.create(null)
	objs.forEach((obj) => {
		Object.keys(obj).forEach((key) => {
			map[key] = obj[key]
		})
	})
	return map;
}


export { extend }