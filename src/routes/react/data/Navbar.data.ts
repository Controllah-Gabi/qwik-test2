export const navigationItems = [
  {
    title: 'SPORTSWEAR',
  },
  {
    title: 'FOOTWEAR',
  },
  {
    title: 'OUTFITS',
  },
  { title: 'SALE' },
  { title: 'BRANDS' },
  { title: 'ACCESSORIES' },
];

export const brandItems = [
  { title: 'Nike', path: 'nike' },
  { title: 'New Balance', path: 'new-balance' },
  { title: 'Hoka', path: 'hoka' },
  { title: 'On Running', path: 'on-running' },
];

export const accessoriesItems = {
  women: [
    {
      brand: '',
      path: 'accessories',
      items: [
        { title: 'Socks', path: 'accessories?gender=women' },
        {
          title: 'Caps & Hats',
          path: 'accessories-caps?gender=women',
        },
        { title: 'Shop All', pathn: 'accessories?gender=women' },
      ],
    },
  ],
};

export const outfitItems = {
  men: [
    { title: 'Summer Sets', path: 'outfits?category=Gym' },
    { title: 'Tracksuits', path: 'outfits?category=Tracksuit' },
  ],
  women: [
    {
      title: 'Adanola Tracksuits',
      path: 'outfits?category=Tracksuit&brand=Adanola',
    },
  ],
};

export const groupedSportswearItems = {
  men: [
    {
      brand: 'Nike',
      path: 'sportswear-nike',
      items: [
        { title: 'Nike Miler Tops', path: 'sportswear-miler?gender=men' },
        {
          title: 'Nike Tech Fleece',
          path: 'sportswear-tech-fleece?gender=men',
        },
        { title: 'Nike Sets', path: 'outfits?brand=Nike&gender=men' },
        { title: 'Nike Pants', path: 'sportswear-nike-pants?gender=men' },
        { title: 'Nike Shorts', path: 'sportswear-nike-shorts?gender=men' },
        { title: 'Nike Half Zip', path: 'sportswear-nike-half-zip?gender=men' },
        {
          title: 'Nike Windrunners',
          path: 'sportswear-nike-windrunner?gender=men',
        },
        { title: 'Nike Rise 365', path: 'sportswear-nike-rise-365?gender=men' },
        { title: 'Nike Trail', path: 'sportswear-nike-trail?gender=men' },
        { title: 'Sale', path: 'sportswear-nike?sale=true?gender=men' },
        { title: 'Shop All', path: 'sportswear-nike?gender=men' },
      ],
    },
    {
      brand: 'On',
      path: 'sportswear-on',
      items: [
        { title: 'On Jackets', path: 'sportswear-on-jackets?gender=men' },
        { title: 'On Pants', path: 'sportswear-on-pants?gender=men' },
        { title: 'On Shorts', path: 'sportswear-on-shorts?gender=men' },
        { title: 'Sale', path: 'sportswear-on?sale=true&gender=men' },
        { title: 'Shop All', path: 'sportswear-on?gender=men' },
      ],
    },
  ],
  women: [
    {
      brand: 'Adanola',
      path: 'sportswear-adanola?gender=women',
      items: [
        {
          title: `Adanola Tops & Sportsbra's`,
          path: 'sportswear-adanola-tops',
        },
        {
          title: 'Adanola Jackets',
          path: 'sportswear-adanola-jackets?gender=women',
        },
        {
          title: 'Adanola Joggers',
          path: 'sportswear-adanola-joggers?gender=women',
        },
        {
          title: 'Adanola Leggings',
          path: 'sportswear-adanola-leggings?gender=women',
        },
        {
          title: 'Adanola Hoodies',
          path: 'sportswear-adanola-hoodies?gender=women',
        },
        { title: 'Sale', path: 'sportswear-adanola?sale=true&gender=women' },
        { title: 'Shop All', path: 'sportswear-adanola?gender=women' },
      ],
    },
    {
      brand: 'Nike',
      path: 'sportswear-nike?gender=women',
      items: [
        {
          title: `Nike Tops & Sportsbra's`,
          path: 'sportswear-nike-tops?gender=women',
        },
        {
          title: 'Nike Leggings',
          path: 'sportswear-nike-leggings?gender=women',
        },
        {
          title: 'Nike Shorts',
          path: 'sportswear-nike-shorts?gender=women',
        },
        {
          title: 'Nike 1/2 & 1/4 Zip',
          path: 'sportswear-nike-half-zip?gender=women',
        },
      ],
    },
  ],
};

export const groupedFootwearItems = {
  men: [
    {
      brand: 'Nike',
      path: 'footwear-nike?gender=men',
      items: [
        {
          title: 'Nike Air Max 95',
          path: 'footwear-nike-airmax-95?gender=men',
        },
        { title: 'Nike Trail', path: 'footwear-nike-trail?gender=men' },
        {
          title: 'Nike React Vision',
          path: 'footwear-nike-react-vision?gender=men',
        },
        {
          title: 'Nike TN Air Max Plus',
          path: 'footwear-nike-air-max-plus?gender=men',
        },
        { title: 'Nike Vomero 5', path: 'footwear-nike-vomero?gender=men' },
        { title: 'Nike Dunk', path: 'footwear-nike-dunk?gender=men' },
        { title: 'Sale', path: 'footwear-nike?sale=true&gender=men' },
        { title: 'Shop All', path: 'footwear-nike?gender=men' },
      ],
    },
    {
      brand: 'On',
      path: 'footwear-on?gender=men',

      items: [
        { title: 'On Cloudswift', path: 'footwear-on-cloudswift?gender=men' },
        {
          title: 'On Cloudstratus',
          path: 'footwear-on-cloudstratus?gender=men',
        },
        { title: 'On Cloudvista', path: 'footwear-on-cloudvista?gender=men' },
        {
          title: 'On Cloudmonster',
          path: 'footwear-on-cloudmonster?gender=men',
        },
        { title: 'Sale', path: 'footwear-on?sale=true&gender=men' },
        { title: 'Shop All', path: 'footwear-on?gender=men' },
      ],
    },
    {
      brand: 'New Balance',
      path: 'footwear-new-balance?gender=men',
      items: [
        {
          title: 'New Balance 9060',
          path: 'footwear-new-balance-9060?gender=men',
        },
        {
          title: 'New Balance Fresh Foam',
          path: 'footwear-new-balance-fresh-foam?gender=men',
        },
        {
          title: 'New Balance 2002R',
          path: 'footwear-new-balance-2002R?gender=men',
        },
        {
          title: 'New Balance 1906',
          path: 'footwear-new-balance-1906?gender=men',
        },
        { title: 'Sale', path: 'footwear-new-balance?sale=true&gender=men' },
        { title: 'Shop All', path: 'footwear-new-balance?gender=men' },
      ],
    },
    {
      brand: 'Hoka',
      path: 'footwear-hoka?gender=men',

      items: [
        {
          title: 'Hoka Challenger',
          path: 'footwear-hoka-challenger?gender=men',
        },
        { title: 'Hoka Clifton', path: 'footwear-hoka-clifton?gender=men' },
        { title: 'Sale', path: 'footwear-hoka?sale=true&gender=men' },
        { title: 'Shop All', path: 'footwear-hoka?gender=men' },
      ],
    },
    {
      brand: 'Asics',
      path: 'footwear-asics?gender=men',

      items: [
        { title: 'Asics Gel-NYC', path: 'footwear-asics-gel-nyc?gender=men' },
        { title: 'Asics Gel-1130', path: 'footwear-asics-gel-1130?gender=men' },
        { title: 'Asics GT 2160', path: 'footwear-asics-gt-2160?gender=men' },
        {
          title: 'Asics Gel Venture',
          path: 'footwear-asics-gel-venture?gender=men',
        },
        { title: 'Sale', path: 'footwear-asics?sale=true&gender=men' },
        { title: 'Shop All', path: 'footwear-asics?gender=men' },
      ],
    },
  ],
  women: [
    {
      brand: 'Nike',
      path: 'footwear-nike?gender=women',
      items: [
        { title: 'Nike Dunk', path: 'footwear-nike-dunk?gender=women' },
        {
          title: 'Nike Air Force',
          path: 'footwear-nike-air-force?gender=women',
        },
        { title: 'Nike P-6000', path: 'footwear-nike-p6000?gender=women' },
        {
          title: 'Nike Air Max 95',
          path: 'footwear-nike-airmax-95?gender=women',
        },
        { title: 'Nike Vomero 5', path: 'footwear-nike-vomero?gender=women' },
        { title: 'Sale', path: 'footwear-nike?sale=true&gender=women' },
        { title: 'Shop All', path: 'footwear-nike?gender=women' },
      ],
    },
    {
      brand: 'UGG',
      path: 'footwear-ugg?gender=women',
      items: [
        {
          title: 'UGG Tasman',
          path: 'footwear-ugg-tasman?gender=women',
        },
        {
          title: 'UGG Lowmel',
          path: 'footwear-ugg-lowmel',
        },
      ],
    },
    {
      brand: 'New Balance',
      path: 'footwear-new-balance?gender=women',
      items: [
        {
          title: 'New Balance 530',
          path: 'footwear-new-balance-530?gender=women',
        },
        {
          title: 'New Balance 9060',
          path: 'footwear-new-balance-9060?gender=women',
        },
        {
          title: 'New Balance Fresh Foam',
          path: 'footwear-new-balance-fresh-foam?gender=women',
        },
        {
          title: 'New Balance 2002R',
          path: 'footwear-new-balance-2002R?gender=women',
        },
        {
          title: 'New Balance 1906',
          path: 'footwear-new-balance-1906?gender=women',
        },
        { title: 'Sale', path: 'footwear-new-balance?sale=true&gender=women' },
        { title: 'Shop All', path: 'footwear-new-balance?gender=women' },
      ],
    },
    {
      brand: 'Adidas',
      path: 'footwear-adidas?gender=women',
      items: [
        { title: 'Adidas Samba', path: 'footwear-adidas-samba?gender=women' },
        { title: 'Adidas Campus', path: 'footwear-adidas-campus?gender=women' },
        { title: 'Sale', path: 'footwear-adidas?sale=true&gender=women' },
        { title: 'Shop All', path: 'footwear-adidas?gender=women' },
      ],
    },
  ],
};
