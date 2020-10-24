import { Component, RefObject, createRef, Fragment } from "react";
import {
  SkinViewer,
  FXAASkinViewer,
  WalkingAnimation,
  createOrbitControls,
} from "skinview3d";
// import { createOrbitControls } from "../src/lib/skinview3d/orbit_controls";
import { v4 as uuid } from "uuid";

type Props = {
  username: string;
  width?: number;
  height?: number;
  enableRotate?: boolean;
  enableZoom?: boolean;
  enablePan?: boolean;
  walkingSpeed?: number;
};

type State = {
  viewer?: SkinViewer | FXAASkinViewer;
  reqID?: string;
};

export default class Skin3d extends Component<Props> {
  public skinviewRef: RefObject<HTMLDivElement>;
  public state: State;

  constructor(props: Props) {
    super(props);
    this.skinviewRef = createRef();
    this.state = {
      viewer: undefined,
      reqID: uuid(),
    };
  }

  public componentDidMount() {
    console.log("[Skin3d] Component just mounted.");

    this.setState(
      {
        viewer: new FXAASkinViewer({
          width: this.props.width,
          height: this.props.height,
        }),
      },
      () => {
        const { viewer } = this.state;
        const {
          enableRotate,
          enableZoom,
          enablePan,
          walkingSpeed,
        } = this.props;

        viewer!.loadSkin(
          `https://skin.vimeworld.ru/raw/skin/${this.props.username}.png?_=${this.state.reqID}`
        );
        viewer!.loadCape(
          `https://skin.vimeworld.ru/raw/cape/${this.props.username}.png?_=${this.state.reqID}`
        );

        const walk = viewer!.animations.add(WalkingAnimation);
        walk.speed = walkingSpeed || 0.7;

        let control = createOrbitControls(viewer!);
        control.enableRotate = enableRotate || true;
        control.enableZoom = enableZoom || false;
        control.enablePan = enablePan || false;
      }
    );
  }

  public componentWillUnmount() {
    // console.log("[Skin3d] Cleaing up the component...");

    this.setState({
      viewer: undefined,
      reqID: undefined,
    });
  }

  public componentDidUpdate(prevProps: Props) {
    const { viewer } = this.state;

    if (prevProps.username !== this.props.username) {
      console.log("[Skin3d] Component received new username prop.");

      // Reassigning new skin and cape for the viewer
      viewer!.loadSkin(
        `https://skin.vimeworld.ru/raw/skin/${this.props.username}.png?_=${this.state.reqID}`
      );
      viewer!.loadCape(
        `https://skin.vimeworld.ru/raw/cape/${this.props.username}.png?_=${this.state.reqID}`
      );
    }

    if (
      prevProps.width !== this.props.width ||
      prevProps.height !== this.props.height
    ) {
      viewer!.setSize(this.props.width!, this.props.height!);
    }
  }

  public render() {
    return (
      <Fragment>
        <div
          ref={this.skinviewRef}
          className="playerSkinCanvasParent shadow"
          style={{ cursor: "move" }}
        />
      </Fragment>
    );
  }
}