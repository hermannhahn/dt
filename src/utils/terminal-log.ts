class Icons {
	private icons: { [key: string]: string } = {
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
	}

	public loadIcon(icon: string): string {
		return this.icons[icon] || "Icon not found"
	}
}

export class terminal {
	public static log(icon: string, text: string) {
		const icons = new Icons()
		const iconChar = icons.loadIcon(icon)
		console.log(`${iconChar} ${text}`)
	}
}
