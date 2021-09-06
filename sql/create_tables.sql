CREATE TABLE IF NOT EXISTS servers (
    discord_server_id VARCHAR(100) PRIMARY KEY,
    server_tags TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS channels (
	discord_channel_id VARCHAR(100) PRIMARY KEY,
    discord_server_id VARCHAR(100) NOT NULL REFERENCES servers(discord_server_id),
    channel_tags TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS messages (
    message TEXT NOT NULL,
    date TIMESTAMPTZ,
    discord_channel_id VARCHAR(100) NOT NULL REFERENCES channels(discord_channel_id),
    discord_server_id VARCHAR(100) NOT NULL REFERENCES servers(discord_server_id),
    discord_author_id VARCHAR(100) NOT NULL
);