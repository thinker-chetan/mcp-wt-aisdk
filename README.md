### This is a test app for dynamic MCP tool calls (Per user)

# Dynamic MCP invocations based on user Auth
- Spawning MCP Client instances per requests - obviously closing them in the finally block.
- User Auth (PAT) is passed at MCP client creation only - AI can't access it.

### Setup BE only
- Clone the Repo

    ```bash
    git clone https://github.com/thinker-chetan/mcp-wt-aisdk.git
    ```

- Create .env
    ```bash
    cp .env.example .env
    ```
    And add your Gemini API Key.

- Create `userPATStore.json`
    ```bash
    cp userPATStore.json.example userPATStore.json
    ```
    And add few users with PAT keys.

- Start Dev Server

    ```node
    npm run build
    ```

- Build

    ```node
    npm run build
    ```

- Start server

    ```node
    npm run start
    ```

- Test
    ```bash
    curl --location 'http://localhost:8000/chat' \
    --header 'x-user: <username>' \
    --header 'Content-Type: application/json' \
    --data '{
        "message": "Refer the tools. Tell me about me."
    }'
    ```
