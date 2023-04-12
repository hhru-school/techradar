import { SimulationNodeDatum, forceCollide, forceSimulation } from 'd3';

import { Entry, Segment, clip } from './utils';

interface Node extends SimulationNodeDatum {
    x: number;
    y: number;
    radius: number;
}

function nodeToEntry(node: Node): Entry {
    return { x: node.x, y: node.y, radius: node.radius };
}
function packEntries(entries: Entry[], segment: Segment, borderOffset = 0): Entry[] {
    const nodes: Node[] = entries.map((d) => ({ ...d }));

    const simulation = forceSimulation()
        .nodes(nodes)
        .velocityDecay(0.19)
        .force('collide', forceCollide().radius(12).strength(1))
        .stop()
        .tick();

    for (
        let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
        i < n;
        ++i
    ) {
        simulation.tick();

        nodes.forEach((node) => {
            const entry = clip(nodeToEntry(node), segment, borderOffset);
            node.x = entry.x;
            node.y = entry.y;
        });
    }

    return nodes.map((node) => ({ x: node.x, y: node.y, radius: node.radius }));
}

export default packEntries;
