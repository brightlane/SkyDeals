name: FlightDealGenerator

on:
  schedule:
    - cron: '0 3 * * *'  # 3AM UTC daily
  workflow_dispatch:

jobs:
  generate-and-post:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20'

    - name: Install dependencies
      run: npm install

    - name: Generate deals
      run: node flight-deal-generator.js

    - name: Auto-post to Twitter/X
      env:
        TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
        TWITTER_API_SECRET: ${{ secrets.TWITTER_API_SECRET }}
        TWITTER_ACCESS_TOKEN: ${{ secrets.TWITTER_ACCESS_TOKEN }}
        TWITTER_ACCESS_SECRET: ${{ secrets.TWITTER_ACCESS_SECRET }}
        TWITTER_BEARER_TOKEN: ${{ secrets.TWITTER_BEARER_TOKEN }}
      run: |
        TWEET="✈️ HOT DEAL: $(ls output/*/*.html | head -1 | xargs basename) | flights.yourdomain.com #FlightDeals #TravelHacks"
        
        curl -X POST "https://api.twitter.com/2/tweets" \
          -H "Authorization: Bearer $TWITTER_BEARER_TOKEN" \
          -H "Content-Type: application/json" \
          -d "{\"text\":\"$TWEET\"}"

    - name: Post to Reddit (via webhook)
      if: ${{ secrets.REDDIT_WEBHOOK != '' }}
      run: |
        curl -X POST "${{ secrets.REDDIT_WEBHOOK }}" \
          -H "Content-Type: application/json" \
          -d '{
            "content_title": "Fresh Flight Deals Today!",
            "content": "New deals generated: flights.yourdomain.com/output/",
            "username": "FlightDealBot"
          }'

    - name: Slack notification (optional)
      if: ${{ secrets.SLACK_WEBHOOK_URL != '' }}
      uses: 8398a7/action-slack@v3
      with:
        status: ${{ job.status }}
        fields: repo,message,commit,author,action,eventName,ref,workflow,job,took
      env:
        SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

    - name: Verify & ping
      run: |
        echo "✅ $(find output -name '*.html' | wc -l) pages generated"

        curl -s "https://www.google.com/ping?sitemap=https://flights.yourdomain.com/output/sitemap-deals.xml" || true
