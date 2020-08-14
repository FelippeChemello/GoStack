const { exec } = require("child_process")

exec("yarn install", (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return;
    }
    if(stderr) {
        console.log(stderr)
        return;
    }
    console.log(stdout)
})

exec("yarn build", (err, stdout, stderr) => {
    if (err) {
        console.log(err)
        return;
    }
    if (stderr) {
        console.log(stderr)
        return;
    }
    console.log(stdout)
})

