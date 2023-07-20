![License: MIT](https://img.shields.io/badge/License:_MIT-grey.svg?style=plastic&color=blue)

# ecommerce-api
## Description
This is the backend to an ecommerce platform that integrate things like categorization, inventory, and tags for search.
- I learned how to write good models and queries to match said models.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Features](#features)
- [Contribute](#contribute)
- [Tests](#tests)

## Installation
- `git clone git@github.com:JenevaRay/ecommerce-api.git`
- `cd ecommerce-api`
- `npm i`
- `cat db/schema.sql | mysql -u root -p`
- `(optional) node seeds/index.js`
- `node server.js`

## Usage
- Point Insomnia to the server (example URL is 127.0.0.1:3001) to run API queries against it.

[![Video of software in use.](https://drive.google.com/file/d/1E8ZZG61G3SWgCJjiKte4rkqAzsEhktRL/view?usp=drive_link)](https://drive.google.com/file/d/1E8ZZG61G3SWgCJjiKte4rkqAzsEhktRL/view?usp=drive_link)
## Credits
- Vincent Pan helped explain sequelize models.  Thank you!
## License
[MIT License *file*](LICENSE)

https://opensource.org/licenses/mit
## Features
Added routes which were not specified in the database, and extensions to said routes (including deep additions of tags-to-products, products-to-tags, and more!)
## Contributing
Email me at JenevaRay@gmail.com with a Git push request.
## Questions
My GitHub profile: https://github.com/JenevaRay

Please feel free to contact me via Email at JenevaRay@gmail.com
