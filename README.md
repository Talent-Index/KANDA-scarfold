# KANDA - African Cultural Heritage NFT Platform

## **"Own Your Heritage. Preserve Your Pride. Profit From Your Past."**
> *Every African story deserves to live forever - and reward its keeper*

## 🚨 **The Cultural Crisis We Face TODAY**

### **Our Heritage is Disappearing Before Our Eyes**
- 📉 **Every 14 days**, another African language dies forever
- 👴 **90% of African elders** will take their stories to the grave - unrecorded, unlicensed, unrewarded
- 🏛️ **$2.6 billion** annual revenue from "African-inspired" content goes to foreign companies, not creators
- 📱 **85% of African youth** can't name 5 traditional stories from their own community
- 🌍 **Netflix, Disney, Hollywood** profit from African culture while communities remain poor

### **The Painful Reality:**
While **Wakanda generates $1.3 billion** for Marvel using African aesthetics, the **real African communities** whose cultures inspired it remain in poverty. Our grandmothers' lullabies become corporate jingles. Our traditional patterns become fashion trends. Our sacred stories become blockbuster plots.

**We are losing our cultural wealth to digital colonialism.**

---

## 🔥 **Why This Matters RIGHT NOW**

African cultural artifacts, traditional knowledge, and intangible heritage face **extinction** due to:
- 📉 **Cultural Erasure**: Urbanization and globalization are wiping out traditions faster than we can preserve them
- 💸 **Economic Exploitation**: Our ancestors' wisdom generates billions for others while communities stay poor  
- 🏛️ **Digital Colonialism**: Western institutions monetize African elements without compensation or credit
- 👥 **Knowledge Gap**: Elders die with untold stories while youth disconnect from their roots
- ⚖️ **No Ownership**: Zero systems to prove authenticity or claim rightful compensation for our heritage

**The Clock is Ticking**: We're not just losing stories - we're losing our identity, our economic power, and our children's birthright.

---

## 🎯 **Target Users**

### **Primary**: African Heritage Creators (40+ years)
- Traditional storytellers, craftspeople, musicians
- Elders with deep cultural knowledge
- Community wisdom keepers

### **Secondary**: Cultural Institutions & Buyers
- Museums, universities, educational organizations
- Documentary filmmakers and media companies
- Global collectors of authentic cultural NFTs

### **Tertiary**: Community Facilitators
- Heritage Ambassadors (tech-savvy youth)
- Cultural organizations and NGOs
- Government cultural preservation agencies

---

## 🚀 **Key Features**

### 🎨 **Cultural Asset Minting**
- **Voice-First Interface**: Record stories in native languages with AI translation
- **Multi-Media Support**: Audio, video, images, and text documentation
- **Metadata Enrichment**: Cultural context, historical significance, usage rights
- **IPFS Storage**: Permanent, decentralized preservation

### 👥 **Community Verification System**  
- **Cross-Community Validation**: Prevents local corruption through distributed verification
- **Reputation Scoring**: Validators earn reputation tokens for accurate verifications
- **Dispute Resolution**: Community governance for contested heritage items

### 💰 **Smart Royalty Distribution**
```solidity
Revenue Split:
├── Creator : 40%
├── Community Fund: 30%  
├── Elder Validators: 20%
└── Platform Sustainability: 10%
```

### 🏪 **Heritage Marketplace**
- **Curated Collections**: Organized by culture, region, and type
- **Licensing Tiers**: Personal, Educational, Commercial, Exclusive usage rights
- **Global Discovery**: Multi-language search and recommendation system
- **Impact Tracking**: Show community benefit from each purchase

### 📚 **Educational Integration**
- **Special Pricing**: Discounted rates for schools and universities
- **Curriculum Integration**: Ready-to-use cultural content for educators
- **Teacher Resources**: Lesson plans and cultural context materials
- **Student Engagement**: Interactive heritage exploration tools

---

## 🏗️ **Technical Architecture**

### **Built with Scaffold-ETH2**
- **⚡ Next.js Frontend**: React-based UI with TypeScript autocompletion
- **🔗 Smart Contracts**: Solidity contracts with hot reload development
- **🌈 RainbowKit Integration**: Seamless wallet connection experience  
- **🪝 Custom Hooks**: Simplified Web3 interactions with wagmi wrappers
- **🧱 Reusable Components**: Pre-built Web3 components for rapid development

---

**KANDA** is a **blockchain-powered revolution** where Africans finally:
- **OWN** their cultural assets as verified digital property
- **PROFIT** from their heritage when others use it commercially  
- **CONTROL** how their traditions are shared with the world
- **CELEBRATE** being African with economic pride, not just cultural pride
- **PRESERVE** their legacy for children and grandchildren forever

Stop watching others get rich from your heritage. Start earning from your own stories.
- 🎙️ **Record & Mint** cultural assets (stories, music, crafts, wisdom) as verified NFTs
- 👴 **Community Validation** through multi-elder approval systems
- 💰 **Earn Royalties** when content is licensed commercially or educationally
- 🌍 **Global Access** connecting authentic African heritage with worldwide audiences
- 🏘️ **Community Benefit** automatic revenue sharing with communities and validators


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`

## 🚀 Setup ERC-20 Token Extension

This extension introduces an ERC-20 token contract and demonstrates how to use interact with it, including getting a holder balance and transferring tokens.

The ERC-20 Token Standard introduces a standard for Fungible Tokens ([EIP-20](https://eips.ethereum.org/EIPS/eip-20)), in other words, each Token is exactly the same (in type and value) as any other Token.

The ERC-20 token contract is implemented using the [ERC-20 token implementation](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol) from OpenZeppelin.

### Setup

Deploy your contract running ```yarn deploy```

### Interact with the token

Start the front-end with ```yarn start``` and go to the _/erc20_ page to interact with your deployed ERC-20 token.

You can check the code at ```packages/nextjs/app/erc20/page.tsx```.


