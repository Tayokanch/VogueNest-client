# Voguenest Full-Stack Kubernetes Project

A hands-on **full-stack e-commerce application** deployed on a **bare-metal Kubernetes cluster**, including frontend, backend API, and MongoDB database, with realistic Kubernetes patterns.  
Includes **Stripe test payment integration**, persistent storage, LoadBalancer exposure with MetalLB, and Ingress routing.

This project demonstrates **real-world DevOps practices**: secure secrets handling, internal networking, scalable deployments, and cluster observability.

---

## 🔹 Project Overview

**Purpose:** Deploy a production-style full-stack application on Kubernetes while practicing cluster networking, service exposure, persistent storage, and secret management.

**Key Problems Solved:**
- Securely expose frontend without exposing internal services  
- Manage sensitive credentials safely with Kubernetes Secrets  
- Persist database data across pod restarts  
- Route traffic to multiple services via Ingress  
- Test production-like Stripe payments in a bare-metal cluster

---

**Key Points:**
- Frontend exposed publicly via LoadBalancer + Ingress  
- API and MongoDB exposed internally only (ClusterIP)  
- PersistentVolumeClaims ensure MongoDB data durability  
- Secrets securely store database credentials, JWT secrets, and Stripe keys

---

## ⚡ Core Components & Features

### 1. Deployments
- Frontend, API, and MongoDB pods managed via **Deployments**  
- Replica scaling supported  
- Pod labels used for service selection

### 2. Services
- **ClusterIP:** MongoDB and internal API access  
- **LoadBalancer:** Frontend access via MetalLB  
- NodePort auto-created for LoadBalancer (for external access)

### 3. Secrets & Configuration
- **Opaque Secrets:** MongoDB credentials, JWT secrets, Stripe keys  
- **Injected into containers** via `envFrom` or `env.valueFrom.secretKeyRef`  
- Real secrets **gitignored**; template provided for reproducibility

### 4. Persistent Storage
- **PersistentVolumeClaim (PVC)** for MongoDB data  
- Mounted at `/data/db`  
- Ensures database durability across pod restarts

### 5. Ingress & Routing
- **NGINX Ingress Controller** installed  
- Hostname-based routing:
  - `voguenest.com` → Frontend  
- External access via MetalLB IP

### 6. Networking
- Internal DNS: `*.svc.cluster.local` for pod-to-pod communication  
- Frontend communicates with API using service name:
```ts
axios.get('http://voguenest-api-service.default.svc.cluster.local:3100')
```
---

## 🛠️ Tools & Technologies

- ☸️ **Kubernetes** – cluster orchestration  
- 🏗️ **MetalLB** – LoadBalancer for bare-metal clusters  
- 🌀 **NGINX Ingress Controller** – routing and reverse proxy  
- 🐳 **Docker** – containerization  
- 🗄️ **MongoDB** – persistent storage  
- 🟢 **Node.js / Express** – backend API  
- ⚛️ **React** – frontend  
- 🔒 **Secrets & PVCs** – secure configuration and persistent storage


