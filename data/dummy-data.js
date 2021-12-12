import Product from '../models/product';

const PRODUCTS = [
  new Product(
    'p1',
    'u1',
    'Apple Watch Series 3',
    'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/42-alu-space-sport-black-nc-1up?wid=1673&hei=1353&fmt=jpeg&qlt=95&.v=1594318651000',
    'Space Gray Aluminum Case with Black Sport Band',
    29.99
  ),
  new Product(
    'p2',
    'u1',
    'Macbook Pro 2021',
    'https://cdn.pocket-lint.com/r/s/970x/assets/images/158839-laptops-review-apple-macbook-pro-14-inch-review-image2-ribxgzs9jt.jpg',
    'M1 Pro takes the exceptional performance of the M1 architecture to a whole new level for pro users. Even the most ambitious projects are easily handled with up to 10 CPU cores, up to 16 GPU cores, a 16‑core Neural Engine, and dedicated encode and decode media engines that support H.264, HEVC, and ProRes codecs.',
    99.99
  ),
  new Product(
    'p3',
    'u2',
    'Nudge Book',
    'https://www.demoucelle.com/files/2017/10/Nudge-visual.jpg',
    'The authors start from the premise that the judgments and decisions people make often lack rationality (you probably already wondered sometimes “how come these people took THIS decision, whereas everybody knows THAT decision would have been so much better?”) . Thaler and Sunstein explain the choices people make, are very much influenced by how these choices were presented (i.e. the ‘choice architecture’). Whether you want it or not, whether you’re conscious about it or not, whenever you present a choice to somebody, there are very small things about how you present this choice that will have a direct influence on the ultimate decision people make. Understanding these very small things (called ‘nudges’) will help you guide people towards the ‘best’ decision (while still giving them the freedom of choice). A powerful way to influence others.  ',
    8.99
  ),
  new Product(
    'p4',
    'u3',
    'SpaceX Starlink Internet Dish',
    'https://i.ebayimg.com/images/g/CqsAAOSwOeRhOQf7/s-l1600.jpg',
    "What the content is? Why would that matter? It's a limited edition!",
    15.99
  ),
  new Product(
    'p5',
    'u3',
    'Tesla Roadster',
    'https://i0.wp.com/hipertextual.com/wp-content/uploads/2021/01/tesla-roadster-1.jpg?fit=1440%2C810&ssl=1',
    'Awesome hardware, crappy keyboard and a hefty price. Buy now before a new one is released!',
    2299.99
  ),
  new Product(
    'p6',
    'u1',
    'Remarkable 2',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/koo-remarkable-2-lead-1617061667.jpg',
    "Can be used for role-playing (not the kind of role-playing you're thinking about...).",
    5.49
  )
];

export default PRODUCTS;