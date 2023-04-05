import { Icons } from "utils/icon-text"

export class terminal {
	public static log(icon: string, text?: string) {
		const msgIcon = new Icons(icon)
		const msg = text !== undefined ? ` ${text}` : ""
		console.log("  " + msgIcon.print() + msg)
	}
	public static logInline(icon: string, text?: string) {
		const msgIcon = new Icons(icon)
		const msg = text ? " " + text : ""
		process.stdout.write("  " + msgIcon.print() + msg)
	}
	public static debug(text: string) {
		this.log("debug", text)
	}
	public static error(text: string) {
		this.log("error", text)
	}
	public static success(text?: string) {
		this.log("success", text)
	}
	public static warn(text?: string) {
		this.log("warn", text)
	}
	public static info(text?: string) {
		this.log("info", text)
	}
}
