const fs = require("fs")
const path = require("path")

fs.readdir(path.join(__dirname, "bots"), (err1, files) => {
	if (err1) throw err1
	console.log("All bots: ", files)

	const list = []
	files.forEach(file => {
		fs.readFile(path.join(__dirname, "bots", file), (err2, data) => {
			if (err2) throw err2
			const parsed = JSON.parse(data)
			list.push({id: parsed.id, name: parsed.name, discrim: parsed.discrim, avatar: parsed.avatar})

			if (list.length == files.length) {
				fs.writeFile(path.join(__dirname, "list.json"), JSON.stringify(list), err3 => {
					if (err3) throw err3
					console.log("List of bots created")
				})
			}
		})
	})
})
