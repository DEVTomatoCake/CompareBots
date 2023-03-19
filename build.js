const fs = require("fs")
const path = require("path")

fs.readdir(path.join(__dirname, "bots"), (err, files) => {
	if (err) throw err
	console.log("Bot files: ", files)

	const list = []
	files.forEach(file => {
		fs.readFile(path.join(__dirname, "bots", file), (err, data) => {
			if (err) throw err
			const parsed = JSON.parse(data)
			list.push({id: parsed.id, name: parsed.name, discrim: parsed.discrim, avatar: parsed.avatar})

			if (list.length == files.length) {
				fs.writeFile(path.join(__dirname, "dist", "list.json"), JSON.stringify(list), err => {
					if (err) throw err
					console.log("List built successfully")
				})
			}
		})
	})
})
