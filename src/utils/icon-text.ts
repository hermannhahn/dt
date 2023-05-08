const icons: any = {
	success: '✔',
	done: '✅',
	doneerror: '⛏️',
	tick: '🗸',
	unchecked: '☐',
	checked: '☑',
	error: '❌',
	ok: '🆗',
	free: '🆓',
	new: '🆕',
	film: '🎞️',
	mic: '🎙️',
	volumeup: '🔊',
	volumedown: '🔈',
	mixer: '🎚️',
	dice: '🎲',
	label: '🏷️',
	break: '🛑',
	breakheart: '💔',
	lamp: '💡',
	zzz: '💤',
	fail: '❌',
	stop: '⛔',
	folder: '📁',
	pin: '📌',
	clip: '📎',
	rule: '📏',
	lib: '📕' || '📗' || '📘' || '📙',
	antena: '📡',
	email: '📧',
	letterbox: '📫',
	emptyletterbox: '📭',
	libs: '📚',
	dollar: '💲',
	smartphone: '📱',
	signal: '📶',
	tape: '📼',
	refresh: '🔄',
	joystick: '🕹️',
	mouse: '🖱️',
	list: '📋',
	add: '➕',
	keyboard: '⌨️',
	speechballoon: '💬',
	update: '🔄',
	trash: '🗑️',
	map: '🗺️',
	earth: '🌍',
	archive: '🗃️',
	index: '🗂️',
	bookmark: '🔖',
	underconstruction: '🚧',
	siren: '🚨',
	flag: '🚩',
	nosmoke: '🚭',
	shield: '🛡️',
	tool: '🛠️',
	laptop: '💻',
	minidisk: '💽',
	cdrom: '💿',
	bug: '🐞',
	warn: '⚠️',
	info: ' ℹ️',
	heart: '❤️',
	pen: '✒️',
	library: '📚',
	push: '📤',
	pull: '📥',
	commit: '📝',
	staging: '📦',
	stack: '📚',
	branch: '🌱',
	merge: '🔀',
	package: '📦',
	file: '📄',
	save: '💾',
	search: '🔎',
	sign: '✍',
	password: '🔑',
	question: '❓',
	work: '🔨',
	star: '⭐',
	item: '📌',
	gear: '⚙️',
	energy: '⚡',
	clock: '⏰',
	time: '⏱',
	debug: '🐛',
	terminal: '🖥',
	cloud: '☁',
	rain: '🌧',
	lightning: '🌪',
	cloudsun: '🌤',
	shootingstar: '🌠',
	starshining: '🌟',
	sun: '🌞',
	moon: '🌒',
	play: '▶',
	playpause: '⏯',
	user: '👤',
	party: '🎉',
	target: '🎯',
	launch: '🚀',
	mosquito: '🦟',
	blood: '🩸',
	bomb: '💣',
	watch: '⌚',
	store: '🏪',
	timer: '⌛',
	phone: '☎',
	phonecall: '📞',
	phonehangup: '📴',
	phoneincoming: '📲',
	phoneoutgoing: '📳',
	phonevoicemail: '📩',
	phonevibrate: '📳',
	phonealert: '📵',
	phonebattery: '🔋',
	powerplug: '🔌',
	arrowLeft: '⬅️',
	arrowRight: '➡️',
	arrowUp: '⬆️',
	arrowDown: '⬇️',
	fingerUp: '👆',
	fingerDown: '👇',
	fingerLeft: '👈',
	fingerRight: '👉',
	dot: '⚪',
	dotBlack: '⚫',
	dotRed: '🔴',
	dotGreen: '🟢',
	dotBlue: '🔵',
	dotYellow: '🟡',
	dotPurple: '🟣',
	dotOrange: '🟠',
	dotBrown: '🟤',
	git: '🐙',
	lock: '🔒',
	unlock: '🔓',
	crypt: '🔐',
	decrypt: '🔏',
}

type IconName = keyof typeof icons

export class Icons {
	private icon: string

	constructor(iconName: IconName) {
		this.icon = icons[iconName]
		// If icon is not found, return iconLabel
		if (!this.icon) {
			this.icon = this.iconLabel(iconName)
		}
	}

	public toString(): string {
		return this.icon
	}

	public iconLabel(text: any) {
		// Get first four letters of text
		text = text.toString().slice(0, 4).toLowerCase()
		// Colors:
		// blue background: \x1b[44m\x1b[37m
		// white background: \x1b[47m\x1b[30m
		// yellow background: \x1b[43m\x1b[30m
		// black background: \x1b[40m\x1b[37m
		// red background: \x1b[41m\x1b[37m
		// green background: \x1b[42m\x1b[37m
		// cyan background: \x1b[46m\x1b[30m
		// magenta background: \x1b[45m\x1b[37m
		// white color: \x1b[37m
		// black color: \x1b[30m
		// reset: \x1b[0m
		switch (text) {
			case 'js':
				return '\x1b[44m\x1b[37m' + 'JS' + '\x1b[0m'
			case 'ts':
				return '\x1b[44m\x1b[37m' + 'TS' + '\x1b[0m'
			case 'html':
				return '\x1b[47m\x1b[37m' + 'HTML' + '\x1b[0m'
			case 'css':
				return '\x1b[46m\x1b[37m' + 'CSS' + '\x1b[0m'
			default:
				return '\x1b[47m\x1b[30m' + text.toUpperCase() + '\x1b[0m'
		}
	}
}
