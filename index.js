const yaml = require("js-yaml")
const fs = require("fs")
const path = require("path")

const commit_types = yaml.load(fs.readFileSync(
  path.resolve(__dirname, "commit_types.yml"), {encoding: "utf-8"}))

const shareable_config = yaml.load(fs.readFileSync(
  path.resolve(__dirname, "shareable_config.yml"), {encoding: "utf-8"}))

for (var commit_type of commit_types) {
  for (var type_name of [commit_type.type].flat()) {
    shareable_config.releaseRules.push({
      type: type_name,
      release: commit_type.release
    })
    var generator_rule = {type: type_name}
    for (var key of Object.keys(commit_type).filter(
      x => !["type", "release"].includes(x)
    )) {
      generator_rule[key] = commit_type[key]
    }
    shareable_config.presetConfig.types.push(generator_rule)
  }
}

module.exports = shareable_config
