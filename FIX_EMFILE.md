# Fix for "EMFILE: too many open files" Error

This error occurs when the file watcher tries to watch too many files. Here are solutions:

## Solution 1: Increase File Descriptor Limit (Temporary)

Run this command in your terminal before starting the app:

```bash
ulimit -n 4096
cd mobile
npm start
```

## Solution 2: Increase File Descriptor Limit Permanently (macOS)

1. Create or edit `~/.zshrc` (or `~/.bash_profile` if using bash):
```bash
echo "ulimit -n 4096" >> ~/.zshrc
source ~/.zshrc
```

## Solution 3: Install Watchman (Recommended)

Watchman is Facebook's file watching service that's more efficient:

```bash
# Install via Homebrew
brew install watchman

# Or via npm
npm install -g watchman
```

Then restart your terminal and try again:
```bash
cd mobile
npm start
```

## Solution 4: Clear Metro Cache

Sometimes clearing the cache helps:

```bash
cd mobile
npx expo start --clear
```

## Solution 5: Use Expo Go with Tunnel Mode

If the above don't work, try using tunnel mode:

```bash
cd mobile
npx expo start --tunnel
```

## Solution 6: Restart Your Computer

Sometimes a simple restart can resolve file descriptor issues.

## What I've Already Done

1. ✅ Created `.watchmanconfig` file
2. ✅ Updated `.gitignore` to exclude more files
3. ✅ Created `metro.config.js` with optimized watcher settings

## Recommended Steps

1. **First, try installing Watchman:**
   ```bash
   brew install watchman
   ```

2. **Then clear cache and restart:**
   ```bash
   cd mobile
   npx expo start --clear
   ```

3. **If still having issues, increase ulimit:**
   ```bash
   ulimit -n 4096
   npx expo start --clear
   ```

The most common solution is installing Watchman, which is specifically designed for React Native development and handles file watching much more efficiently.

