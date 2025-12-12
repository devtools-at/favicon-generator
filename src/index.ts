/**
 * Favicon Generator
 * Generate favicons from images
 *
 * Online tool: https://devtools.at/tools/favicon-generator
 *
 * @packageDocumentation
 */

function isValidHexColor(color: string): boolean {
  return HEX_COLOR_REGEX.test(color);
}

function normalizeColor(color: string, fallback: string): string {
  return isValidHexColor(color) ? color : fallback;
}

function drawFaviconToCanvas({
  ctx,
  size,
  bgColor,
  textColor,
  shape,
  text,
  fontSize,
}: DrawFaviconOptions): void {
  const safeBgColor = normalizeColor(bgColor, "#3b82f6");
  const safeTextColor = normalizeColor(textColor, "#ffffff");

  // Clear canvas
  ctx.clearRect(0, 0, size, size);

  // Draw background based on shape
  ctx.fillStyle = safeBgColor;

  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "rounded") {
    const radius = size * 0.15;
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, radius);
    ctx.fill();
  } else {
    ctx.fillRect(0, 0, size, size);
  }

  // Draw text/emoji
  if (text.trim()) {
    ctx.fillStyle = safeTextColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const scaledFontSize = (fontSize / 100) * size;
    ctx.font = `bold ${scaledFontSize}px Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`;

    ctx.fillText(text.charAt(0), size / 2, size / 2);
  }
}

// Export for convenience
export default { encode, decode };
