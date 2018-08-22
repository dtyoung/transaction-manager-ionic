export interface Transaction {
    transactionId: String,
    value: Number,
    categoryId: String,
    date: String,
    notes: String
}

export interface Category {
    key: String,
    name: String,
    icon: String
}