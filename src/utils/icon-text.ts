const icons: any = {
	success: "✔",
	error: "✖",
	stop: "⛔",
	bug: "🐞",
	warning: "⚠",
	info: " ℹ",
	library: "📚",
	push: "📤",
	pull: "📥",
	commit: "📝",
	branch: "🌱",
	merge: "🔀",
	package: "📦",
	file: "📄",
	save: "💾",
	search: "🔎",
	sign: "✍",
	password: "🔑",
	question: "❓",
	work: "🔨",
	list: "📋",
	star: "⭐",
	item: "📌",
	gear: "⚙",
	clock: "⏰",
	arrow: "➡",
	arrowLeft: "⬅",
	arrowUp: "⬆",
	arrowDown: "⬇",
	arrowRight: "➡",
	time: "⏱",
}

export class Icons {
	private icon: string

	constructor(icon: string) {
		this.icon = icon
	}

	public print(): string {
		return icons[this.icon]
	}
}
