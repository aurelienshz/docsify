// @ts-check
import {
  Renderer,
  getServerHTMLTemplate,
} from '../../packages/docsify-server-renderer/index';

describe('pacakges/docsify-server-render Renderer', function () {
  it('renders content', async function () {
    const renderer = new Renderer({
      template: getServerHTMLTemplate(),
      config: {
        name: 'docsify',
        repo: 'docsifyjs/docsify',
        // basePath: 'https://docsify.js.org/',
        loadNavbar: true,
        loadSidebar: true,
        subMaxLevel: 3,
        auto2top: true,
      },
    });

    expect(renderer).toBeInstanceOf(Renderer);

    const result = await renderer.renderToString('/docs/ssr.md');

    expect(typeof result).toBe('string');
    expect(result.includes('<h1 id="server-side-rendering">')).toBe(true);
    expect(result.includes('<span>Server-Side Rendering</span></a></h1>')).toBe(
      true
    );
  });

  it('renders aliases the same', async () => {
    const renderer = new Renderer({
      template: getServerHTMLTemplate(),
      config: {
        name: 'docsify',
        repo: 'docsifyjs/docsify',
        // basePath: 'https://docsify.js.org/',
        loadNavbar: true,
        loadSidebar: true,
        subMaxLevel: 3,
        auto2top: true,
        alias: {
          '/de-de/changelog': '/changelog',
          '/zh-cn/changelog': '/changelog',
          '/changelog': '/docs/changelog.md',
        },
      },
    });

    const [one, two, three] = await Promise.all([
      await renderer.renderToString('/de-de/changelog'),
      await renderer.renderToString('/zh-cn/changelog'),
      await renderer.renderToString('/changelog'),
    ]);

    expect(one).toEqual(two);
    expect(two).toEqual(three);
  });
});
