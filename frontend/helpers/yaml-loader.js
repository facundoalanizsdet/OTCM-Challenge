let yaml = require('js-yaml');
let fs   = require('fs');

function YamlLoader(path){
  try {
    return yaml.safeLoad(fs.readFileSync(path, 'utf8'));
  } catch (e) {
    console.log(e);
  }
}
module.exports = YamlLoader;
