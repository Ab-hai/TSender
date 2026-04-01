# 🚀 TSender

**TSender** is a hyper gas-efficient smart contract-based application designed to airdrop tokens to a large number of users in a secure and optimized way.

It ensures correctness, safety, and efficiency when distributing tokens by validating inputs and minimizing unnecessary gas costs.

---

## ✨ Features

### ✅ Core Validations

TSender ensures safe and reliable token distribution by enforcing the following checks:

- Verifies that `totalAmount` matches the sum of all values in the `amounts` array
- Prevents sending ETH along with function calls
- Ensures `recipients.length === amounts.length`
- Rejects transactions with zero address recipients

---

### ⚡ Gas-Optimized Validation

To save gas, additional validations are handled through a separate helper function:

#### `areListsValid(address[] recipients, uint256[] amounts)`

This function checks:

- No duplicate addresses
- No zero address recipients
- At least one recipient exists
- All amounts are greater than 0
- `recipients.length == amounts.length`

---

## 🛠️ Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Ab-hai/TSender.git
cd TSender
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Run the Application

Start the frontend:

```bash
npm run dev
```

Run the local blockchain (Anvil):

```bash
npm run anvil
```

---

## 📁 Project Structure (Overview)

```
TSender/
│── contracts/        # Smart contracts
│── scripts/          # Deployment & scripts
│── frontend/         # UI for interacting with contracts
│── test/             # Tests
│── package.json
```

---

## ⚙️ Tech Stack

- Solidity (Smart Contracts)
- Foundry / Anvil (Local Blockchain)
- Next.js (Frontend)
- Ethers.js / Web3 tools

---

## 🎯 Use Case

TSender is ideal for:

- Token airdrops
- Bulk token transfers
- DAO reward distributions
- Community incentives

---

## 🔗 Repository

GitHub:
👉 https://github.com/Ab-hai/TSender

---

## 📌 Notes

- Designed with **gas efficiency as a priority**
- Separation of validation logic helps reduce on-chain costs
- Suitable for large-scale token distribution

---

## 🤝 Contributing

Feel free to fork the repository and submit pull requests to improve the project!

---

## 📄 License

This project is open-source and available under the MIT License.

---

💡 _Built for efficient and scalable token distribution._
