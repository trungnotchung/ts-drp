import { type DRPNodeConfig } from "@ts-drp/types";

import { program } from "./cli/index.js";
import { loadConfig } from "./config.js";
import { DRPNode } from "./index.js";
import { init as rpc_init } from "./rpc/index.js";

/**
 * Run the DRP node.
 * @param port - The port to run the node on.
 */
export const run = async (port: number = 6969): Promise<void> => {
	program.parse(process.argv);
	const opts = program.opts();
	const config: DRPNodeConfig | undefined = loadConfig(opts.config);

	const node = new DRPNode(config);
	await node.start();
	rpc_init(node, port);
};

run().catch((e) => console.error("Failed to start node: ", e));
