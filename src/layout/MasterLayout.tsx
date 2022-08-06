import {
  SideNav,
  SideNavItems,
  Header,
  HeaderName,
  HeaderContainer,
  HeaderMenuButton,
  SkipToContent,
  Content,
  Grid,
  Column,
  SideNavLink,
} from "@carbon/react";
import * as Icons from "@carbon/icons-react";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import LoginLayout from "./LoginLayout";

export default function MasterLayout(props: PropsWithChildren<unknown>) {
  const router = useRouter();

  return <LoginLayout />;

  return (
    <div>
      <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <>
            <Header aria-labelledby="Kubepiter">
              <SkipToContent />
              <HeaderMenuButton
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
                aria-labelledby=""
                aria-label=""
              />
              <HeaderName prefix="">Kubepiter</HeaderName>

              <SideNav expanded={isSideNavExpanded} aria-label="">
                <SideNavItems>
                  <Link href="/" passHref>
                    <SideNavLink
                      renderIcon={Icons.CloudMonitoring}
                      href="/"
                      large
                      className={
                        router.pathname === "/"
                          ? "cds--side-nav__link--current"
                          : ""
                      }
                    >
                      Dashboard
                    </SideNavLink>
                  </Link>

                  <Link href="/apps" passHref>
                    <SideNavLink
                      renderIcon={Icons.Run}
                      href="/apps"
                      large
                      className={
                        router.pathname === "/apps"
                          ? "cds--side-nav__link--current"
                          : ""
                      }
                    >
                      Apps
                    </SideNavLink>
                  </Link>

                  <Link href="/build_logs" passHref>
                    <SideNavLink
                      renderIcon={Icons.InProgressWarning}
                      href="/build_logs"
                      large
                      className={
                        router.pathname === "/build_logs"
                          ? "cds--side-nav__link--current"
                          : ""
                      }
                    >
                      Builds
                    </SideNavLink>
                  </Link>

                  <Link href="/node_groups" passHref>
                    <SideNavLink
                      renderIcon={Icons.TreeView}
                      href="/node_groups"
                      large
                      className={
                        router.pathname === "/node_groups"
                          ? "cds--side-nav__link--current"
                          : ""
                      }
                    >
                      Node Groups
                    </SideNavLink>
                  </Link>

                  <Link href="/registry" passHref>
                    <SideNavLink
                      renderIcon={Icons.ContainerRegistry}
                      href="/registry"
                      large
                      className={
                        router.pathname === "/registry"
                          ? "cds--side-nav__link--current"
                          : ""
                      }
                    >
                      Registry
                    </SideNavLink>
                  </Link>
                </SideNavItems>
              </SideNav>
            </Header>
            <Content>
              <Grid>
                <Column
                  sm={{ offset: 0, span: 4 }}
                  md={{ offset: 0, span: 8 }}
                  lg={{ offset: 3, span: 13 }}
                  xlg={{ offset: 3, span: 13 }}
                >
                  {props.children}
                </Column>
              </Grid>
            </Content>
          </>
        )}
      />
    </div>
  );
}
