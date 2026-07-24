# AWS Deployment Configuration
Target Architecture: Scalable AWS native configuration capable of supporting 10,000+ daily users with 99.9% uptime.

## 1. Networking (VPC Setup)
- **VPC**: `10.0.0.0/16`
- **Public Subnets** (2 AZs): For Application Load Balancer (ALB) and NAT Gateways.
- **Private Subnets** (2 AZs): For ECS Fargate containers (API, FrontEnd, Workers) and RDS/ElastiCache instances.

## 2. Compute Layer (AWS ECS Fargate)
We use Elastic Container Service (ECS) with Fargate to run our Docker containers without managing EC2 instances.
- **Cluster**: `PredictionPortalCluster`
- **Services**:
  - `Frontend-Service`: 2+ Tasks behind ALB. Autoscaling on CPU > 70%.
  - `API-Service`: 2+ Tasks behind ALB. Autoscaling on RequestCountPerTarget > 1000.
  - `ML-Worker-Service`: 1+ Task. Scales based on SQS queue depth (messages in queue).
  - `Scraper-Cron`: Run as ECS Scheduled Tasks (EventBridge trigger at 05:00 UTC daily).

## 3. Storage Layer
- **Relational DB**: Amazon RDS for PostgreSQL (Multi-AZ deployment for high availability). 
  - `m6g.large` instance type.
  - Automated backups enabled (7-day retention).
- **Cache**: Amazon ElastiCache for Redis.
  - Used for session management, API caching, and Celery broker.
- **Model Storage**: Amazon S3
  - Bucket: `prediction-portal-ml-models` for storing pre-trained `joblib` / `keras` weights. The ML Worker syncs this on startup.

## 4. Content Delivery & Routing
- **DNS**: Route 53 (e.g., `footballpredictions.com`)
- **CDN**: Amazon CloudFront
  - Caches React static assets globally.
  - Sits in front of the ALB.
  - Uses AWS WAF (Web Application Firewall) to protect against DDoS and malicious payloads.
- **SSL**: AWS Certificate Manager (ACM) to provision and auto-renew TLS certs.

## 5. CI/CD Pipeline (GitHub Actions)
1. **Push to `main`** triggers CI.
2. Runs Python `pytest` and frontend `vitest`.
3. Builds Docker images for API, Frontend, Scraper, ML Worker.
4. Pushes images to Amazon ECR (Elastic Container Registry).
5. Updates ECS Service definition to trigger a Rolling Update (Zero Downtime Deployment).

## 6. Monitoring & Logging
- **Logs**: All ECS containers stream logs via `awslogs` log driver to Amazon CloudWatch.
- **Alerting**: CloudWatch Alarms for:
  - RDS CPU > 80%
  - Backend API 5xx Errors > 1%
  - Scraper Task Failure
- **APM**: AWS X-Ray or integration with Datadog for transaction tracing.
