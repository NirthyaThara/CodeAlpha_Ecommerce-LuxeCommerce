const fs = require('fs');

try {
    const data = fs.readFileSync('c:\\Projects\\ECommerce\\backend\\DB\\ecommerce.sql', { encoding: 'utf16le' });
    fs.writeFileSync('c:\\Projects\\ECommerce\\backend\\DB\\ecommerce_real_utf8.sql', data, { encoding: 'utf8' });
    console.log("✅ Successfully converted to UTF-8");

    // Also show a small preview
    console.log("Preview (first 500 chars):");
    console.log(data.substring(0, 500));
} catch (err) {
    console.error("❌ Conversion failed:", err);
}
