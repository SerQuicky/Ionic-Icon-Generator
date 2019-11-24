# Ionic icon generator
Simple and easy to use NodeJS CLI-Application that generates, on the basis of an image (exp. an 1024x1024 icon or splash-image), the icons for the Play- and AppStore. 

# Usage

Execute this line of code in the project
```node index.js [baseImage-Path] [type] [filetype] [platform]```



| Parameter     | Requierement  | Values|
| ------------- |:-------------:| -----:|
| baseImage      | required |  ```depends on path to the base icon/spash image```|
| type      | required      |   ```icon or splash``` |
| filetype | optional      |    ```png, jpeg, jpg (all common image filetypes)``` |
| platform | optional      |    ```android or ios (if its empty both platforms will be created)``` |

# Directory-Structure

The script creates a new directory-structure, if it does not exist and saves the images in the associated folder.

The structure will look like this:

```
└───resources
    ├───android
    │   ├───icon
    │   └───splash
    └───ios
        ├───icon
        └───splash
 ```
 
 # License
 
 MIT
