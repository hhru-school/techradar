import { SimulationNodeDatum, forceCollide, forceSimulation } from 'd3';

import { Entry, Segment, clip } from './utils';

interface Node extends SimulationNodeDatum {
    x: number;
    y: number;
    r: number;
}

function packEntries(entries: Entry[], segment: Segment): Node[] {
    const nodes: Node[] = entries.map((d) => ({ ...d }));

    const simulation = forceSimulation()
        .nodes(nodes)
        .velocityDecay(0.2)
        .force(
            'collide',
            forceCollide()
                .radius((node: SimulationNodeDatum) => (node as Node).r)

                .strength(0.3)
        )
        .stop();

    for (
        let i = 0, n = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
        i < n;
        ++i
    ) {
        simulation.tick();
        for (const node of nodes) {
            const entry = clip(node, segment);
            node.x = entry.x;
            node.y = entry.y;
        }
    }

    return nodes.map((node) => ({ x: node.x, y: -node.y, r: node.r }));
}

export default packEntries;
