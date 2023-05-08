import { Deploy } from 'modules/cli/deploy'
import { Init } from 'modules/cli/init'
import { Install } from 'modules/cli/install'
import { New } from 'modules/cli/new'
import { Save } from 'modules/cli/save'
import { Template } from 'modules/cli/template'

export class Cli {
	static save = Save
	static new = New
	static init = Init
	static install = Install
	static template = Template
	static deploy = Deploy
}
