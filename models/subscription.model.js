import mongoose from 'mongoose'

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minlength: 3,
      maxlength: 100
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Price must be a positive number']
    },
    currency: {
      type: String,
      required: [true, 'Currency is required'],
      enum: ['USD', 'EUR', 'GBP', 'INR'],
      default: 'INR'
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly']
    },
    category: {
      type: String,
      enum: [
        'sports',
        'entertainment',
        'education',
        'health',
        'business',
        'technology',
        'lifestyle',
        'fashion',
        'travel',
        'food',
        'finance',
        'economy',
        'politics',
        'environment',
        'science',
        'automotive',
        'real estate',
        'other'
      ],
      required: [true, 'Subscription category is required']
    },
    paymentMethod: {
      type: String,
      enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
      required: [true, 'Payment method is required']
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active'
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required'],
      validate: {
        validator: function (value) {
          return value <= new Date()
        },
        message: 'Start date cannot be in the future'
      }
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value >= this.startDate
        },
        message: 'Renewal date must be after the start date'
      }
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  {
    timestamps: true
  }
)

// Auto Calculate renewal date if missing
subscriptionSchema.pre('save', function (next) {
  if (!this.renewalDate) {
    const frequencyMap = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365
    }
    const daysToAdd = frequencyMap[this.frequency] || 0
    this.renewalDate = new Date(this.startDate)
    this.renewalDate.setDate(this.renewalDate.getDate() + daysToAdd)
  }

  //   Auto update status to expired if renewal date is in the past
  if (this.renewalDate < new Date()) {
    this.status = 'expired'
  }
  next()
})

const Subscription = mongoose.model('Subscription', subscriptionSchema)

export default Subscription
