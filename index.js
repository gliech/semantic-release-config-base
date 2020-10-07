const yaml = require("js-yaml")
const fs = require("fs")
const path = require("path")
const nunjucks = require("nunjucks")
nunjucks.configure({
  autoescape: false,
  tags: {
    blockStart: "# {%",
    variableStart: "# {{",
    commentStart: "# {#"
  }
})

const commit_types = yaml.load(fs.readFileSync(
  path.resolve(__dirname, "commit_types.yml"), {encoding: "utf-8"}))

var core_config = {
  release_rules: [],
  note_generator_rules: [],
  templates: {},
}

for (var commit_type of commit_types) {
  for (var type_name of [commit_type.type].flat()) {
    core_config.release_rules.push({
      type: type_name,
      release: commit_type.release
    })
    var generator_rule = {type: type_name}
    for (var key of Object.keys(commit_type).filter(
      x => !["type", "release"].includes(x)
    )) {
      generator_rule[key] = commit_type[key]
    }
    core_config.note_generator_rules.push(generator_rule)
  }
}

const template_dir = "note_generator_templates"
for (var template of fs.readdirSync(path.resolve(__dirname, template_dir))) {
  var key_name = path.basename(template, path.extname(template))
  core_config.templates[key_name] = fs.readFileSync(
    path.resolve(__dirname, template_dir, template), {encoding: "utf-8"})
}

const config_location = path.resolve(__dirname, "shareable_config.yml")
const expanded_config = nunjucks.render(config_location, core_config)
module.exports = yaml.load(expanded_config)
