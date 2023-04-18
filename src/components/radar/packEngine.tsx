import { SimulationNodeDatum, forceCollide, forceSimulation } from 'd3';

import { Entry, Segment } from './types';
import { clip } from './utils';

interface Node extends SimulationNodeDatum {
    x: number;
    y: number;
    r: number;
}

const velocityDecay = 0.5;
const strength = 0.3;

function packEntries(entries: Entry[], segment: Segment): Node[] {
    const nodes: Node[] = entries.map((d) => ({ ...d }));

    const simulation = forceSimulation()
        .nodes(nodes)
        .velocityDecay(velocityDecay)
        .force(
            'collide',
            forceCollide()
                .radius((node: SimulationNodeDatum) => (node as Node).r)

                .strength(strength)
        )
        .stop();

    /*
    Количество циклов и идея: https://github.com/backstage/backstage/blob/master/plugins/tech-radar/src/components/Radar/utils.ts
    
    Согласно документациии https://github.com/d3/d3-force: 

    # simulation.alpha([alpha]) · Source
    Alpha is roughly analogous to temperature in simulated annealing.
    It decreases over time as the simulation “cools down”.
    When alpha reaches alphaMin, the simulation stops; see simulation.restart.

    If alpha is specified, sets the current alpha to the specified number in the range [0,1] 
    and returns this simulation. If alpha is not specified, returns the current alpha value, which defaults to 1.

    # simulation.alphaMin([min]) 

    If min is specified, sets the minimum alpha to the specified number in the range [0,1] 
    and returns this simulation.
    If min is not specified, returns the current minimum alpha value, which defaults to 0.001.
    The simulation’s internal timer stops when the current alpha is less than the minimum alpha.
    The default alpha decay rate of ~0.0228 corresponds to 300 iterations.

    # simulation.alphaDecay([decay]) · Source

    If decay is specified, sets the alpha decay rate to the specified number 
    in the range [0,1] and returns this simulation.
    If decay is not specified, returns the current alpha decay rate,
     which defaults to 0.0228… = 1 - pow(0.001, 1 / 300) where 0.001 is the default minimum alpha.

    Т.е. по факту, из формулы Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()) 
    мы получаем число 300 - количество "кадров", которое нужно просчитать до "затухания" симуляции при 
    дефолтном минимальном пороговом знчении alphaMin([min]) со скоростью затухания alphaDecay([decay]).

    */

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
