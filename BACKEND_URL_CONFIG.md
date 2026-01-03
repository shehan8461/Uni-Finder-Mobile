# Backend URL Configuration Guide

## Current Configuration

The app is configured to use:
- **Flask API**: `http://192.168.1.129:5002` (for physical devices)
- **Node.js API**: `http://192.168.1.129:3000` (for physical devices)

## How It Works

The app automatically detects the platform:
- **iOS Simulator**: Uses `http://127.0.0.1:5002` and `http://localhost:3000`
- **Android Emulator**: Uses `http://10.0.2.2:5002` and `http://10.0.2.2:3000`
- **Physical Device**: Uses your computer's network IP (`192.168.1.129`)

## Finding Your Computer's IP Address

### On macOS:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

Look for the IP address that starts with `192.168.x.x` or `10.x.x.x`

### On Windows:
```bash
ipconfig
```

Look for "IPv4 Address" under your active network adapter.

### On Linux:
```bash
hostname -I
```

## Updating the IP Address

If your computer's IP changes, update it in `mobile/src/pages/BudgetOptimizerNew.js`:

```javascript
const COMPUTER_IP = '192.168.1.129'; // Change this to your current IP
```

## Testing Connection

1. **Check Flask server is accessible:**
   ```bash
   curl http://192.168.1.129:5002/health
   ```

2. **Check Node.js server is accessible:**
   ```bash
   curl http://192.168.1.129:3000/api/budget/save
   ```

## Troubleshooting

### "Network request failed" Error

1. **Check both devices are on the same network:**
   - Your phone and computer must be on the same WiFi network

2. **Check firewall settings:**
   - macOS: System Preferences → Security & Privacy → Firewall
   - Allow connections on ports 5002 and 3000

3. **Verify Flask server is listening on all interfaces:**
   - Flask should show: `Running on http://0.0.0.0:5002`
   - This means it's accessible from network, not just localhost

4. **Check IP address is correct:**
   - Use the IP shown in Flask server logs
   - Example: `Running on http://192.168.1.129:5002`

### "Connection refused" Error

- Make sure both servers are running:
  - Flask on port 5002
  - Node.js on port 3000

### For iOS Simulator Testing

If testing on iOS Simulator, the app will automatically use `localhost` - no changes needed.

### For Android Emulator Testing

If testing on Android Emulator, the app will automatically use `10.0.2.2` - no changes needed.

## Current Setup (Based on Your Server Logs)

Your Flask server shows:
```
Running on http://127.0.0.1:5002
Running on http://192.168.1.129:5002
```

So your network IP is: **192.168.1.129**

The app is already configured to use this IP for physical devices! ✅

