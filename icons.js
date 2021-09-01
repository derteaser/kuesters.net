const mixer = require('svg-mixer');

class MySprite extends mixer.Sprite {
    generate() {
        // Call parent `generate` method and then transform the tree
        return super.generate().then(svg => {
            svg.each('symbol', node => node.attrs.class = null);
            svg.each('title', node => node = null);
            return svg;
        });
    }
}

mixer([
    // Navigation
    'node_modules/heroicons/outline/x.svg',
    // Directions
    'node_modules/heroicons/outline/arrow-narrow-right.svg',
    // Brands
    'node_modules/simple-icons/icons/facebook.svg',
    'node_modules/simple-icons/icons/github.svg',
    'node_modules/simple-icons/icons/instagram.svg',
    'node_modules/simple-icons/icons/linkedin.svg',
    'node_modules/simple-icons/icons/twitter.svg',
    'node_modules/simple-icons/icons/xing.svg',
], { spriteConfig: { usages: false }, spriteClass: MySprite } )
    .then(result => result.write('img/icons.svg'));