// ----------------------------------------------------------------------

export const DOMAIN = process.env.NEXT_PUBLIC_HOST_BASE_DOMAIN;

function path(root, sublink) {
  return `${root}${sublink}`;
}

const PAGE_ROOT = DOMAIN;
const ROOTS_MILEAGE = path(PAGE_ROOT, '/mileage');
const ROOTS_MANAGE = path(PAGE_ROOT, '/manage');
const ROOTS_REPORT = path(PAGE_ROOT, '/report');

export const CATEGORY = '/category';
export const GLOBAL_ITEM = '/item/global';
export const SEMESTER_ITEM = '/item/semester';
export const VIEW = '/view';
export const REGISTER = '/register';
export const RESULT = '/result';
export const USER = '/user';
export const SETTING = '/setting';
export const STUDENT = '/student';
export const ITEM = '/item';
export const RANK = '/rank';

export const PATH_PAGES = {
  root: PAGE_ROOT,
  mileage: {
    category: path(ROOTS_MILEAGE, CATEGORY),
    globalItem: path(ROOTS_MILEAGE, GLOBAL_ITEM),
    semesterItem: path(ROOTS_MILEAGE, SEMESTER_ITEM),
    view: path(ROOTS_MILEAGE, VIEW),
    register: path(ROOTS_MILEAGE, REGISTER),
    result: path(ROOTS_MILEAGE, RESULT),
  },
  manage: {
    user: path(ROOTS_MANAGE, USER),
    setting: path(ROOTS_MANAGE, SETTING),
    student: path(ROOTS_MANAGE, STUDENT),
    register: path(ROOTS_MANAGE, REGISTER),
  },
  report: {
    root: path(ROOTS_REPORT, '/'),
    item: path(ROOTS_REPORT, ITEM),
    rank: path(ROOTS_REPORT, RANK),
    category: path(ROOTS_REPORT, CATEGORY),
  },
};

console.log(PATH_PAGES.mileage.register);

const API_ROOT = '/api';

const ROOTS_EXCEL = path(API_ROOT, '/excel');
const ROOTS_UPLOAD = path(ROOTS_EXCEL, '/upload');
const ROOTS_DOWNLOAD = path(ROOTS_EXCEL, '/download');

export const PATH_API = {
  root: API_ROOT,
  excel: {
    upload: {
      semesterItem: path(ROOTS_UPLOAD, '/mileage-items'),
      record: path(ROOTS_UPLOAD, '/mileage-records'),
      result: path(ROOTS_UPLOAD, '/scholarship-results'),
    },
    download: {
      format: {
        semesterItem: path(ROOTS_DOWNLOAD, '/semesterItemFormat'),
        record: path(ROOTS_DOWNLOAD, '/mileageRecordFormat'),
        result: path(ROOTS_DOWNLOAD, '/mileageScholarshipFormat'),
      },
      category: path(ROOTS_DOWNLOAD, '/mileage-categories'),
      globalItem: path(ROOTS_DOWNLOAD, '/mileage-items-common'),
      semesterItem: (semester) => path(ROOTS_DOWNLOAD, `/mileage-items?semester=${semester}`),
      register: (semester) => path(ROOTS_DOWNLOAD, `/scholarship-applicants?semester=${semester}`),
    },
  },
};

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newPassword: path(ROOTS_AUTH, '/new-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_DASHBOARD, '/blank'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    file: path(ROOTS_DASHBOARD, '/file'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

//----------------------------------------------------------------------------------------------------

export const PATH_DOCS = {
  root: 'https://docs.minimals.cc',
  changelog: 'https://docs.minimals.cc/changelog',
};

export const PATH_ZONE_ON_STORE = 'https://mui.com/store/items/zone-landing-page/';

export const PATH_MINIMAL_ON_STORE = 'https://mui.com/store/items/minimal-dashboard/';

export const PATH_FREE_VERSION = 'https://mui.com/store/items/minimal-dashboard-free/';

export const PATH_FIGMA_PREVIEW =
  'https://www.figma.com/file/rWMDOkMZYw2VpTdNuBBCvN/%5BPreview%5D-Minimal-Web.26.11.22?node-id=0%3A1&t=ya2mDFiuhTXXLLF1-1';
