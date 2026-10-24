# Project Screenshots & Media Assets

Place real project screenshots, product mockups, and previews in this directory.

### How to use:
1. Save your screenshot image here, e.g., `shopmanager.png` or `ai-mock-interview.jpg`.
2. Open `src/data/projects.js`.
3. Import the image at the top of the file:
   ```javascript
   import shopmanagerImg from '../assets/projects/shopmanager.png';
   ```
4. Assign it to the corresponding project object:
   ```javascript
   image: shopmanagerImg,
   ```
If `image` is left as an empty string `""`, a clean placeholder with the project's category icon will automatically render.
