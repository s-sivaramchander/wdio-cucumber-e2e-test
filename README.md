# WebdriverIO + Cucumber E2E Setup

## Environment

The working environment:

```text
Node.js       : v24.21.0
npm           : 11.19.0
WebdriverIO   : 9.32.0
OS            : Windows
Framework     : Cucumber
Browser       : Chrome
```

Project location:

```text
C:\Users\shred\Videos\Workspace\WebdriverIO\wdio-cucumber-e2e-test
```

---

# 1. Initial Problem

Running:

```cmd
npx wdio config --npm-tag latest
```

failed with:

```text
npm error Cannot read properties of null (reading 'explain')
```

The WebdriverIO wizard was trying to install:

```text
@wdio/local-runner@latest
@wdio/cucumber-framework@latest
@wdio/spec-reporter@latest
@types/node
@wdio/globals@latest
expect-webdriverio
```

The failure was occurring during npm dependency resolution.

---

# 2. Check Node.js and npm Versions

Run:

```cmd
node -v
npm -v
npx wdio --version
```

The working versions are:

```text
Node.js       v24.21.0
npm           11.19.0
WebdriverIO   9.32.0
```

---

# 3. Important Node.js Note

Initially, Node.js was:

```text
v24.12.0
```

Trying:

```cmd
npm install -g npm@latest
```

failed because the latest npm required a newer Node.js version:

```text
Required:
node ^22.22.2 || ^24.15.0 || >=26.0.0

Actual:
node v24.12.0
```

Therefore, Node.js was upgraded to:

```text
v24.21.0
```

After upgrading Node.js, open a new Command Prompt and verify:

```cmd
node -v
npm -v
```

---

# 4. Identify the Actual npm Dependency Problem

The npm debug log showed that the WebdriverIO packages were being downloaded successfully.

For example:

```text
@wdio/local-runner        9.32.0
@wdio/cucumber-framework  9.32.0
@wdio/spec-reporter      9.32.0
@wdio/globals             9.31.3
```

However, npm encountered a peer-dependency conflict involving:

```text
expect-webdriverio
```

The dependency tree contained:

```text
@wdio/globals@9.31.3
        |
        └── expects expect-webdriverio ^6.0.9
```

while npm was also resolving a newer:

```text
expect-webdriverio@7.x
```

This caused npm's dependency resolver to fail.

The final error was:

```text
TypeError: Cannot read properties of null (reading 'children')
```

from npm's Arborist dependency-resolution code.

---

# 5. Clean the Existing Installation

Navigate to the project:

```cmd
cd C:\Users\shred\Videos\Workspace\WebdriverIO\wdio-cucumber-e2e-test
```

Remove the existing dependencies:

```cmd
rmdir /s /q node_modules
```

Remove the lock file:

```cmd
del package-lock.json
```

If either file/folder does not exist, the error can be ignored.

---

# 6. Install Compatible WebdriverIO Dependencies

Instead of allowing npm to automatically resolve the conflicting peer dependency, install compatible versions explicitly.

Run:

```cmd
npm install --save-dev @wdio/local-runner@9.32.0 @wdio/cucumber-framework@9.32.0 @wdio/spec-reporter@9.32.0 @wdio/globals@9.31.3 @types/node expect-webdriverio@6.1.0 --legacy-peer-deps
```

### What this installs

```text
@wdio/local-runner       9.32.0
@wdio/cucumber-framework 9.32.0
@wdio/spec-reporter      9.32.0
@wdio/globals            9.31.3
@types/node              latest compatible version
expect-webdriverio       6.1.0
```

The important part is:

```text
expect-webdriverio@6.1.0
```

and:

```text
--legacy-peer-deps
```

This prevents npm from getting stuck on the peer-dependency conflict.

---

# 7. Verify WebdriverIO

After installation:

```cmd
npx wdio --version
```

Expected:

```text
9.32.0
```

---

# 8. Verify the Dependency Versions

Run:

```cmd
npm list @wdio/globals expect-webdriverio
```

You should see approximately:

```text
@wdio/globals@9.31.3
expect-webdriverio@6.1.0
```

The important relationship is:

```text
@wdio/globals@9.31.3
        ↓
expect-webdriverio@6.1.0
```

This avoids the conflict caused by npm attempting to use the newer `expect-webdriverio@7.x`.

---

# 9. Run the WebdriverIO Configuration Wizard

Once the dependencies are installed successfully, run:

```cmd
npx wdio config
```

Do NOT use:

```cmd
npx wdio config --npm-tag latest
```

and avoid:

```cmd
npm init wdio@latest .
```

if the npm generator continues to reproduce the dependency-resolution problem.

---

# 10. Recommended Cucumber Configuration

For a Cucumber E2E project, select:

```text
Runner:
Local

Automation backend:
On my local machine

Framework:
Cucumber

Reporter:
Spec

Browser:
Chrome
```

For JavaScript, select the JavaScript/no-compiler option when prompted.

Accept the normal defaults for the remaining options unless the project requires something different.

---

# 11. Recommended Working Package Combination

The working combination is:

```text
Node.js                 24.21.0
npm                     11.19.0
WebdriverIO             9.32.0
@wdio/local-runner      9.32.0
@wdio/cucumber-framework 9.32.0
@wdio/spec-reporter     9.32.0
@wdio/globals            9.31.3
expect-webdriverio       6.1.0
```

---

# 12. Quick Setup From Scratch

If creating a completely new project, use:

```cmd
cd C:\Users\shred\Videos\Workspace\WebdriverIO
```

Create the project:

```cmd
mkdir wdio-cucumber-e2e-test
cd wdio-cucumber-e2e-test
```

Install the dependencies:

```cmd
npm install --save-dev @wdio/local-runner@9.32.0 @wdio/cucumber-framework@9.32.0 @wdio/spec-reporter@9.32.0 @wdio/globals@9.31.3 @types/node expect-webdriverio@6.1.0 --legacy-peer-deps
```

Verify:

```cmd
npx wdio --version
```

Then start the configuration:

```cmd
npx wdio config
```

---

# 13. If the Installation Fails Again

Check the versions:

```cmd
node -v
npm -v
npx wdio --version
```

Then check the dependency tree:

```cmd
npm list @wdio/globals expect-webdriverio
```

If necessary, clean everything again:

```cmd
rmdir /s /q node_modules
del package-lock.json
npm cache clean --force
```

Then reinstall:

```cmd
npm install --save-dev @wdio/local-runner@9.32.0 @wdio/cucumber-framework@9.32.0 @wdio/spec-reporter@9.32.0 @wdio/globals@9.31.3 @types/node expect-webdriverio@6.1.0 --legacy-peer-deps
```

---

# 14. Important Lessons From This Error

### Don't immediately downgrade Node.js

The final environment with:

```text
Node.js v24.21.0
npm 11.19.0
```

is working.

### Don't keep using `@latest` for every dependency

Using:

```cmd
@latest
```

can cause different WebdriverIO packages to resolve to slightly different versions.

For a stable project, explicitly pin compatible versions.

### Be careful with `expect-webdriverio`

The problem occurred because npm attempted to resolve a newer version while:

```text
@wdio/globals@9.31.3
```

had a peer dependency on:

```text
expect-webdriverio ^6.0.9
```

Using:

```text
expect-webdriverio@6.1.0
```

and:

```text
--legacy-peer-deps
```

resolved the installation problem.

---

# 15. Final Verification Commands

Run these three commands after setup:

```cmd
node -v
```

```cmd
npm -v
```

```cmd
npx wdio --version
```

Then:

```cmd
npm list @wdio/globals expect-webdriverio
```

A successful setup should be approximately:

```text
Node.js:        v24.21.0
npm:            11.19.0
WebdriverIO:    9.32.0

@wdio/globals:        9.31.3
expect-webdriverio:   6.1.0
```

At this point the WebdriverIO + Cucumber dependency installation is working and you can proceed with creating your `wdio.conf.js`, feature files, step definitions, and page objects.
