import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema, model } = mongoose;

const remarkSchema = new Schema({
  text: String,
  date: { type: Date, default: Date.now }
});


const paymentFranchiseSchema = new Schema({
  date: {
    type: Date,
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
});

const itemSchema = new Schema({
  sku: { type: String, required: true },
  quantity: { type: String, required: true },
}, { _id: false });

const idAndPassComSchema = new Schema({
  id: { type: String, default: '' },
  pass: { type: String, default: '' },
  date: { type: String, default: ''},

}, { _id: false });

const idAndPassWebsiteSchema = new Schema({
  id: { type: String, default: '' },
  pass: { type: String, default: '' },
}, { _id: false });

const idAndPassInSchema = new Schema({
  id: { type: String, default: '' },
  pass: { type: String, default: '' },
  date: { type: String, default: ''},
}, { _id: false });

const taskSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  status: {
    type: String,
    enum: ['Pending', 'Done', 'Error'],
    default: 'Pending',
  },
  comment: {
    type: String,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
}, { _id: false });

const fileSchema = new Schema({
  path: String,
  originalName: String,
}, { _id: false });

const paymentSchema = new mongoose.Schema({
  stage1: {
    amount: { type: String },
    paymentMode: { type: String },
    document: { type: String },
    status: { type: String },
  },
  stage2: {
    amount: { type: String },
    paymentMode: { type: String },
    document: { type: String },
    status: { type: String },
  },
  stage3: {
    amount: { type: String },
    paymentMode: { type: String },
    document: { type: String },
    status: { type: String },
  },
});


const contactSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  enrollmentId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  primaryContact: {
    type: String,
    required: true,
  },
  secondaryContact: {
    type: String,
  },
  service: {
    type: String,
    required: true,
  },
  managerId: {
    type: Schema.Types.ObjectId,
    ref: 'Manager',
  },
  password: {
    type: String,
  },
  passwordSet: { type: Boolean, default: false },
  // IN
  idCard: {
    type: String,
  },
  idCardDate: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  training: {
    type: String,
  },
  trainingDate: {
    type: String,
  },
  ebook: {
    type: String,
  },
  ebookDate: {
    type: String,
  },
  supportPortal: {
    type: String,
  },
  supportPortalDate: {
    type: String,
  },
  walletPortal: {
    type: String,
  },
  walletPortalDate: {
    type: String,
  },
  gallery: {
    type: String,
  },
  galleryDate: {
    type: String,
  },
  archive: {
    type: String,
  },
  legality: {
    type: String,
  },
  legalityDate: {
    type: String,
  },
  legalityLink: {
    type: String,
  },
  billsSent: { type: String }, // New field for bills status
  legalityStatus: { type: String }, // New field for legality status

  // template1Sent: { type: Boolean, default: false },
  // template2Sent: { type: Boolean, default: false },
  // template3Sent: { type: Boolean, default: false },
  // template4Sent: { type: Boolean, default: false },
  // template5Sent: { type: Boolean, default: false },
  // template6Sent: { type: Boolean, default: false },
  // template7Sent: { type: Boolean, default: false },
  // template8Sent: { type: Boolean, default: false },
  // template9Sent: { type: Boolean, default: false },
  // template10Sent: { type: Boolean, default: false },
  // template11Sent: { type: Boolean, default: false },
  // template12Sent: { type: Boolean, default: false },
  // template13Sent: { type: Boolean, default: false },
  // template14Sent: { type: Boolean, default: false },
  // template15Sent: { type: Boolean, default: false },
  // template16Sent: { type: Boolean, default: false },
  // template17Sent: { type: Boolean, default: false },
  // template18Sent: { type: Boolean, default: false },
  // template19Sent: { type: Boolean, default: false },
  // template20Sent: { type: Boolean, default: false },
  // template21Sent: { type: Boolean, default: false },
  // template22Sent: { type: Boolean, default: false },
  // template23Sent: { type: Boolean, default: false },
  // template24Sent: { type: Boolean, default: false },
  // template25Sent: { type: Boolean, default: false },
  // template26Sent: { type: Boolean, default: false },
  // template27Sent: { type: Boolean, default: false },
  // template28Sent: { type: Boolean, default: false },
  // template29Sent: { type: Boolean, default: false },
  // template30Sent: { type: Boolean, default: false },
  // template31Sent: { type: Boolean, default: false },
  // template32Sent: { type: Boolean, default: false },
  // template33Sent: { type: Boolean, default: false },
  // template34Sent: { type: Boolean, default: false },
  // template35Sent: { type: Boolean, default: false },
  // template36Sent: { type: Boolean, default: false },
  // template37Sent: { type: Boolean, default: false },
  // template38Sent: { type: Boolean, default: false },
  // template39Sent: { type: Boolean, default: false },
  // template40Sent: { type: Boolean, default: false },
  // template41Sent: { type: Boolean, default: false },
  category: {
    type: String,
  },
  state: {
    type: String,
  },
  stateDate: {
    type: String,
  },
  gst: {
    type: String,
  },
  gstDate: {
    type: String,
  },
  onboardingStatus: {
    type: String,
  },
  onboardingDescription: {
    type: String,
  },
  brandName: {
    type: String,
  },
  brandNameDate: {
    type: String,
  },
  accountOpenIn: {
    type: String,
  },
  accountOpenInDate: {
    type: String,
  },

  statusDate: {
    type: String,

  },
  idAndPassIn: {
    type: idAndPassInSchema,
  },
  gtin: {
    type: String,
  },
  gtinDate: {
    type: String,
  },
  listingsIn: {
    type: String,
  },
  listingsInDate: {
    type: String,
  },
  launchIn: {
    type: String,
  },
  launchInDate: {
    type: String,
  },
  adzone: {
    type: String,
  },
  adzoneDate: {
    type: String,
  },
  addRegion: {
    type: String,
  },
  addRegionDate: {
    type: String,
  },
  shipping: {
    type: String,
  },
  shippingDate: {
    type: String,
  },
  cvcIn: {
    type: String,
  },
  cvcInDate: {
    type: String,
  },
  cvcCom: {
    type: String,
  },
  cvcComDate: {
    type: String,
  },
  fbaIn: {
    type: String,
  },
  fbaInDate: {
    type: String,
  },
  fbaLive: {
    type: String,
  },
  accountOpenStatus: {
    type: String,
    enum: ['Already', 'Saumiccraft'],  // Allow only these values
    default: null,  // Set default to null instead of empty string
  },
  
  stateCom: {
    type: String,
  },
  document: {
    type: String,
  },
  documentDate: {
    type: String,
  },
  storeName: {
    type: String,
  },
  storeNameDate: {
    type: String,
  },
  accountOpenCom: {
    type: String,
  },
  accountOpenComDate: {
    type: String,
  },
  idAndPassCom: {
    type: idAndPassComSchema,
  },
  videoKyc: {
    type: String,
  },
  videoKycDate: {
    type: String,
  },
  deduct: {
    type: String,
  },
  deductDate: {
    type: String,
  },
  listingsCom: {
    type: String,
  },
  listingsComDate: {
    type: String,
  },
  launchCom: {
    type: String,
  },
  launchComDate: {
    type: String,
  },
  nia: {
    type: String,
  },
  niaDate: {
    type: String,
  },
  addCredit: {
    type: String,
  },
  addCreditDate: {
    type: String,
  },
  fbaCom: {
    type: String,
  },
  fbaComDate: {
    type: String,
  },
  batch:{
    type: String,
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
  ovc: {
    type: String,
  },
  ovcDate: {
    type: String,
  },
  documents: [fileSchema],
 
  stage1Completion: {
    type: String,
  },
  stage1CompletionDate: {
    type: String,
  },
  payment: paymentSchema,
  invoice: {
    document: { type: String },
  },
  theme: {
    type: String,
  },
  serverPurchase: {
    type: String,
  },
  domainClaim: {
    type: String,
  },
  domainMailVerification: {
    type: String,
  },
  websiteUploaded: {
    type: String,
  },
  paymentGateway: {
    type: String,
  },
  readyToHandover: {
    type: String,
  },
  socialMedia: {
    type: String,
  },
  idAndPassWebsite: {
    type: idAndPassWebsiteSchema,
  },
  subDomain: {
    type: String,
  },
  catFile: {
    type: String,
  },
  flagStatus: { type: Boolean, default: false },
  productFile: {
    type: String,
    description: String
  },
  logo: {
    type: String,
    description: String
  },
  banner: {
    type: String,
  },
  stage2Completion: {
    type: String,
  },
  stage2CompletionDate: {
    type: String,
  },
  stage3Completion: {
    type: String,
  },
  stage3CompletionDate: {
    type: String,
  },
  callDone: {
    type: String,
  },
  postWithDate: {
    type: String,
  },


  // Instagram
  accountOpenInsta: {
    type: String,
  },
  instagramId: {
    type: String,
  },
  instagramPassword: {
    type: String,
  },
  metaConnectedInsta: {
    type: String,
  },

  // Facebook
  accountOpenFacebook: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  facebookPassword: {
    type: String,
  },
  metaConnectedFacebook: {
    type: String,
  },

  // Pinterest
  accountOpenPinterest: {
    type: String,
  },
  pinterestId: {
    type: String,
  },
  pinterestPassword: {
    type: String,
  },
  postPinterest: {
    type: String,
  },

  // Medium
  accountOpenMedium: {
    type: String,
  },
  mediumId: {
    type: String,
  },
  mediumPassword: {
    type: String,
  },
  postMedium: {
    type: String,
  },

  // Quora
  accountOpenQuora: {
    type: String,
  },
  quoraId: {
    type: String,
  },
  quoraPassword: {
    type: String,
  },
  postQuora: {
    type: String,
  },

  items: [itemSchema],

  // amazon.in 
  accountOpenAmazonIn: {
    type: String,
  },
  amazonInId: {
    type: String,
  },
  amazonPass: {
    type: String,
  },

  // amazon.com
  accountOpenAmazonCom: {
    type: String,
  },
  amazonComId: {
    type: String,
  },
  amazonComPass: {
    type: String,
  },

  // flipkart
  accountOpenFlipkart: {
    type: String,
  },
  flipkartId: {
    type: String,
  },
  flipkartPass: {
    type: String,
  },

   // meesho
   accountOpenMeesho: {
    type: String,
  },
  meeshoId: {
    type: String,
  },
  meeshoPass: {
    type: String,
  },

   // ebay
   accountOpenEbay: {
    type: String,
  },
  ebayId: {
    type: String,
  },
  ebayPass: {
    type: String,
  },


  remarks: [remarkSchema],

  totalInvoiceValue: {
    type: Number,
    default: 0,
  },
  payment1: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  payment2: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  payment3: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  payment4: {
    type: paymentFranchiseSchema,
    default: () => ({}),
  },
  brandNameFranchise: {
    type: String,
  },
  brandNameSocial: {
    type: String,
  },
});

// Hash the password before saving the contact
contactSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

const Contact = model('Contact', contactSchema);

export default Contact;
