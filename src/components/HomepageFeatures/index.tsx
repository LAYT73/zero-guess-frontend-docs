import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import Translate, { translate } from "@docusaurus/Translate";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg?: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: translate({
      id: "homepage.features.zeroConfig.title",
      message: "Zero Configuration",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        <Translate
          id="homepage.features.zeroConfig.desc"
          values={{ code: <code>npm i -g zero-guess-frontend</code> }}
        >
          {
            "Just run {code} and get a fully structured frontend project based on best practices. No setup, no stress."
          }
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      id: "homepage.features.architecture.title",
      message: "Scalable Architecture",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        <Translate id="homepage.features.architecture.desc">
          {
            "Projects are initialized using FSD (feature-sliced design) and atomic design principles — ready to scale and maintain long-term."
          }
        </Translate>
      </>
    ),
  },
  {
    title: translate({
      id: "homepage.features.cli.title",
      message: "CLI That Thinks for You",
    }),
    // Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        <Translate id="homepage.features.cli.desc">
          {
            "The CLI helps you generate features, UI components, hooks, and even routing automatically — following strict rules so you can focus on coding."
          }
        </Translate>
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      {/* <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div> */}
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
