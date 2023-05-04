// Description: Template for tkinter python
// Addons: tkinter, and python

export class TkinterPython {
	public name = "tkinter-python"
	public folders = ["src", "compile", "build", "dist"]

	public files = [
		{
			path: "src/main.py",
			content: `
import tkinter as tk

root = tk.Tk()
root.title("Hello World")
root.geometry("400x400")

label = tk.Label(root, text="Hello World")
label.pack()

root.mainloop()
            `,
		},
	]
}
