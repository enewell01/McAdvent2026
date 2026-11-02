// Small pieces shared by the calendar and the Bedrock Together page.

let toastTimer = 0;
export function toast(message: string) {
  const toastEl = document.getElementById("toast") as HTMLElement;
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl.classList.remove("show"), 2600);
}

export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.className = "offscreen";
    document.body.append(area);
    area.select();
    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      // Falls through to the manual copy dialog.
    }
    area.remove();
    return copied;
  }
}

// Any button with a data-copy attribute copies that text.
export function wireCopyButtons() {
  for (const button of document.querySelectorAll<HTMLButtonElement>("[data-copy]")) {
    const text = button.dataset.copy as string;
    button.addEventListener("click", async () => {
      toast((await copyText(text)) ? "Copied" : `Copy failed. It reads ${text}`);
    });
  }
}
