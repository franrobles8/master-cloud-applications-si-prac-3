const { spawn } = require("child_process");

function exec(serviceName, command) {
  console.log(`Stated service [${serviceName}]`);

  let cmd = spawn(command, [], { cwd: "./" + serviceName, shell: true });
  cmd.stdout.on("data", function (data) {
    process.stdout.write(`[${serviceName}] ${data}`);
  });
  cmd.stderr.on("data", function (data) {
    process.stderr.write(`[${serviceName}] ${data}`);
  });
}

exec('weatherservice', 'node src/server.js');
exec('toposervice', 'mvn spring-boot:run');
exec('server','node src/server.js');
// exec('planner','mvn spring-boot:run');
