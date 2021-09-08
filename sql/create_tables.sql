CREATE TABLE IF NOT EXISTS discord_servers (
    discord_server_id VARCHAR(100) PRIMARY KEY,
    server_tags TEXT,
    owner_id VARCHAR(100) NOT NULL,
    server_name TEXT NOT NULL,
    insert_date TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS discord_channels (
	discord_channel_id VARCHAR(100) PRIMARY KEY,
    discord_server_id VARCHAR(100) NOT NULL REFERENCES discord_servers(discord_server_id),
    channel_tags TEXT,
    insert_date TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS discord_messages (
    message TEXT NOT NULL,
    date TIMESTAMPTZ,
    discord_channel_id VARCHAR(100) NOT NULL REFERENCES discord_channels(discord_channel_id),
    discord_server_id VARCHAR(100) NOT NULL REFERENCES discord_servers(discord_server_id),
    discord_author_id VARCHAR(100) NOT NULL,
    discord_message_id VARCHAR(100) NOT NULL
);