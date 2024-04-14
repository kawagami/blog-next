import { createClient } from "redis";

const client = await createClient({
    url: 'redis://host.docker.internal:6379'
});

client.on('error', err => console.log(err));

if (!client.isOpen) {
    client.connect();
}

const set = (key, value) => client.set(key, value);
const get = (key) => client.get(key);
const hset = (key, field, value) => client.HSET(key, field, value);
const hget = (key, field) => client.HGET(key, field);
const hgetAll = (key) => client.HGETALL(key);

export { set, get, hset, hget, hgetAll };
