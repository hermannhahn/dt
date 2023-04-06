import { Icons } from "utils/icon-text"

export class terminal {
	public static log(icon: string, text: any) {
		const msgIcon = new Icons(icon)
		const msg = text !== undefined ? " " + text : ""
		console.log(msgIcon.print() + msg)
	}

	public static logInline(icon: string, text?: string) {
		const msgIcon = new Icons(icon)
		const msg = text ? " " + text : ""
		process.stdout.write(msgIcon.print() + msg)
	}

	public static success(text?: string) {
		this.log("success", text)
	}

	public static error(text?: string) {
		this.log("error", text)
	}

	public static warn(text?: string) {
		this.log("warn", text)
	}

	public static info(text?: string) {
		this.log("info", text)
	}

	public static debug(text?: string) {
		this.log("debug", text)
	}

	public static bug(text?: string) {
		this.log("bug", text)
	}

	public static green(text: string) {
		console.log("\x1b[32m%s\x1b[0m", text)
	}

	public static red(text: string) {
		console.log("\x1b[31m%s\x1b[0m", text)
	}

	public static yellow(text: string) {
		console.log("\x1b[33m%s\x1b[0m", text)
	}

	public static black(text: string) {
		console.log("\x1b[30m%s\x1b[0m", text)
	}

	public static orange(text: string) {
		console.log("\x1b[91m%s\x1b[0m", text)
	}

	public static blue(text: string) {
		console.log("\x1b[34m%s\x1b[0m", text)
	}

	public static magenta(text: string) {
		console.log("\x1b[35m%s\x1b[0m", text)
	}

	public static cyan(text: string) {
		console.log("\x1b[36m%s\x1b[0m", text)
	}

	public static white(text: string) {
		console.log("\x1b[37m%s\x1b[0m", text)
	}

	public static gray(text: string) {
		console.log("\x1b[90m%s\x1b[0m", text)
	}

	public static grey(text: string) {
		console.log("\x1b[90m%s\x1b[0m", text)
	}

	public static bold(text: string) {
		console.log("\x1b[1m%s\x1b[0m", text)
	}

	public static italic(text: string) {
		console.log("\x1b[3m%s\x1b[0m", text)
	}

	public static underline(text: string) {
		console.log("\x1b[4m%s\x1b[0m", text)
	}

	public static inverse(text: string) {
		console.log("\x1b[7m%s\x1b[0m", text)
	}

	public static strikethrough(text: string) {
		console.log("\x1b[9m%s\x1b[0m", text)
	}

	public static hidden(text: string) {
		console.log("\x1b[8m%s\x1b[0m", text)
	}

	public static reset() {
		console.log("\x1b[0m")
	}

	public static clear() {
		console.clear()
	}

	public static clearLine() {
		console.log("\x1b[2K")
	}

	public static cursorTo(x: number, y?: number) {
		console.log("\x1b[" + (y || "") + ";" + x + "f")
	}

	public static cursorMove(x: number, y?: number) {
		console.log("\x1b[" + (y || "") + ";" + x + "f")
	}

	public static cursorUp(count?: number) {
		console.log("\x1b[" + (count || "") + "A")
	}

	public static cursorDown(count?: number) {
		console.log("\x1b[" + (count || "") + "B")
	}

	public static cursorForward(count?: number) {
		console.log("\x1b[" + (count || "") + "C")
	}

	public static cursorBackward(count?: number) {
		console.log("\x1b[" + (count || "") + "D")
	}

	public static cursorLeft(count?: number) {
		console.log("\x1b[" + (count || "") + "D")
	}

	public static cursorRight(count?: number) {
		console.log("\x1b[" + (count || "") + "C")
	}

	public static cursorNextLine(count?: number) {
		console.log("\x1b[" + (count || "") + "E")
	}

	public static cursorPrevLine(count?: number) {
		console.log("\x1b[" + (count || "") + "F")
	}
}
